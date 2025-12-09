import request from 'axios';

import { APP_CONFIG, getApiConfig } from '~/common/config';
import { addNetworkListener, isNetworkConnected } from '~/utils/network';

import { logger } from './logger';
import { getStorageItem } from './storage';
import { showToast } from './toast';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { IErrorMessage, IRequestConfig, IResponse } from '~/types/request';

// 请求队列，用于离线情况下缓存请求
interface IQueuedRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  config: IRequestConfig<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  timestamp: number;
}

// 请求队列
const requestQueue: IQueuedRequest[] = [];
let isProcessingQueue = false;

// 网络状态缓存
let cachedNetworkStatus: { isConnected: boolean; timestamp: number } | null = null;
const NETWORK_CACHE_DURATION = 3000; // 3秒缓存
const MAX_QUEUE_AGE = 5 * 60 * 1000; // 队列最大保留时间: 5分钟

// 统一错误处理
const handleError = (status: number, data: IResponse, isSkipErrorMessage = false): void => {
  const errorMessages: Record<number, IErrorMessage> = {
    401: {
      message: '提示',
      description: '登录超时，请重新登录',
      action: () => {
        // 处理登录超时，例如重定向到登录页面
        // 可以考虑使用导航或Redux清除用户状态
      },
    },
    403: {
      message: '权限错误',
      description: '您没有权限访问该资源',
    },
    404: {
      message: '系统提示',
      description: '访问地址不存在，请联系管理员',
    },
    500: {
      message: '系统错误',
      description: data?.message || '服务器内部错误',
    },
  };

  const error = errorMessages[status] || {
    message: '错误',
    description: data?.message || '系统异常',
  };

  if (!isSkipErrorMessage) {
    showToast(error.description);
  }

  if (error.action) {
    error.action();
  }
};

// 统一响应处理
const parse = <R>(
  res: AxiosResponse,
  params: { isHandleRaw: boolean; isSkipErrorMessage: boolean },
): R => {
  const { status, data } = res;
  const { isHandleRaw, isSkipErrorMessage } = params;

  if (status === 200) {
    if (isHandleRaw) {
      return data as R;
    }
    if (data.code === 0) {
      return data.data as R;
    }
    // code !== 0 时,处理错误并抛出异常
    handleError(status, data, isSkipErrorMessage);
    throw new Error(data.message || '请求失败');
  }

  // 非 200 状态码,处理错误并抛出异常
  handleError(status, data, isSkipErrorMessage);
  throw new Error(data.message || '请求失败');
};

// 获取API配置
const apiConfig = getApiConfig();

// 创建Axios实例
const instance = request.create({
  timeout: apiConfig.timeout,
  baseURL: apiConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // 从存储中获取token
      const token = await getStorageItem<string>('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      logger.error('Error getting token from storage', { error: String(error) });
    }

    // 添加请求日志
    logger.info(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      method: config.method?.toUpperCase(),
      url: config.url,
    });

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 添加响应日志
    logger.info(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
    });

    // 计算请求耗时
    const requestTime = response.headers['x-request-time'];
    if (requestTime) {
      const responseTime = new Date().getTime();
      const duration = responseTime - parseInt(requestTime, 10);
      logger.info(`API Request duration`, { duration: `${duration}ms` });
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data, config } = error.response;
      logger.error(`API Error: ${config.method?.toUpperCase()} ${config.url}`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        status,
      });

      handleError(status, data as IResponse);
    } else if (error.request) {
      logger.error('API Network Error', { message: error.message });
      // ToastView.add('网络错误，请检查您的网络连接');
    } else {
      logger.error('API Request Error', { message: error.message });
      // ToastView.add('请求错误，请稍后重试');
    }
    return Promise.reject(error);
  },
);

// 获取缓存的网络状态
const getCachedNetworkStatus = async (): Promise<boolean> => {
  const now = Date.now();
  if (cachedNetworkStatus && now - cachedNetworkStatus.timestamp < NETWORK_CACHE_DURATION) {
    return cachedNetworkStatus.isConnected;
  }
  const isConnected = await isNetworkConnected();
  cachedNetworkStatus = { isConnected, timestamp: now };
  return isConnected;
};

// 清理过期的请求队列
const cleanExpiredRequests = (): void => {
  const now = Date.now();
  const validRequests = requestQueue.filter((req) => now - req.timestamp < MAX_QUEUE_AGE);
  const expiredCount = requestQueue.length - validRequests.length;

  if (expiredCount > 0) {
    logger.warn(`Cleaned ${expiredCount} expired requests from queue`);
    requestQueue.length = 0;
    requestQueue.push(...validRequests);
  }
};

// 添加网络监听器以处理队列
addNetworkListener(async (state) => {
  if (state.isConnected && requestQueue.length > 0) {
    cleanExpiredRequests();
    await processQueue();
  }
});

// 处理请求队列
const processQueue = async (): Promise<void> => {
  if (isProcessingQueue || requestQueue.length === 0) {
    return;
  }

  isProcessingQueue = true;

  // 检查网络连接(使用缓存)
  const isConnected = await getCachedNetworkStatus();
  if (!isConnected) {
    isProcessingQueue = false;
    return;
  }

  while (requestQueue.length > 0) {
    const queuedRequest = requestQueue.shift();
    if (!queuedRequest) continue;

    const { method, config, resolve, reject } = queuedRequest;

    try {
      const result = await requestMethod(method, { ...config, isSkipNetworkCheck: true });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }

  isProcessingQueue = false;
};

// 请求方法
const requestMethod = async <T, R>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  config: IRequestConfig<T>,
): Promise<R> => {
  const {
    retry = APP_CONFIG.maxRetryCount,
    isSkipNetworkCheck = false,
    isSkipErrorMessage = false,
  } = config;

  // 检查网络连接(使用缓存)
  if (!isSkipNetworkCheck) {
    const isConnected = await getCachedNetworkStatus();
    if (!isConnected) {
      // 添加到队列
      return new Promise<R>((resolve, reject) => {
        const queueRequest: IQueuedRequest = {
          method,
          config: config as IRequestConfig<unknown>,
          resolve: resolve as unknown as (value: unknown) => void,
          reject,
          timestamp: new Date().getTime(),
        };
        requestQueue.push(queueRequest);
        cleanExpiredRequests();
        showToast('当前网络不可用，请求将在恢复连接后自动发送');
      });
    }
  }

  let attempts = 0;

  while (attempts < retry) {
    try {
      const {
        url,
        data,
        isHandleRaw = false,
        timeout = apiConfig.timeout,
        signal,
        headers,
      } = config;

      // 添加请求耗时计算的header
      const customHeaders = {
        'x-request-time': new Date().getTime().toString(),
        ...headers,
      };

      const response = await instance({
        method,
        url,
        [method === 'GET' ? 'params' : 'data']: data,
        timeout,
        signal,
        headers: customHeaders,
      });

      return parse<R>(response, { isHandleRaw, isSkipErrorMessage });
    } catch (error) {
      attempts++;
      if (attempts > retry) {
        return Promise.reject(error);
      }

      // 等待一段时间后重试
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }

  throw new Error('请求失败，已达到最大重试次数');
};

// 导出请求方法
const get = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>('GET', config);

const post = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>('POST', config);

const put = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>('PUT', config);

const del = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>('DELETE', config);

// 文件上传
const uploadFile = async <R>(options: {
  url: string;
  file: unknown;
  name?: string;
  data?: Record<string, unknown>;
  onProgress?: (progress: number) => void;
  retry?: number;
}): Promise<R> => {
  const {
    url,
    file,
    name = 'file',
    data = {},
    onProgress,
    retry = APP_CONFIG.maxRetryCount,
  } = options;

  const formData = new FormData();
  formData.append(name, file as Blob);

  // 添加额外的表单数据
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key] as string);
  });

  // 检查网络连接(使用缓存)
  const isConnected = await getCachedNetworkStatus();
  if (!isConnected) {
    showToast('当前网络不可用，无法上传文件');
    return Promise.reject(new Error('网络不可用'));
  }

  let attempts = 0;

  while (attempts < retry) {
    try {
      const response = await instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        },
      });

      return parse<R>(response, { isHandleRaw: false, isSkipErrorMessage: false });
    } catch (error) {
      attempts++;
      if (attempts >= retry) {
        showToast('文件上传失败');
        return Promise.reject(error);
      }

      // 等待一段时间后重试
      logger.warn(`File upload failed, retrying (${attempts}/${retry})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }

  throw new Error('文件上传失败，已达到最大重试次数');
};

export { del, get, post, put, uploadFile };
