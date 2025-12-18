/**
 * 开发环境 WebSocket 日志转发工具
 * 这个文件不依赖项目内的 logger 结构，可以在任意 RN 项目中复用。
 */

export type DevWsLogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface DevWsLogEntry {
  level: DevWsLogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

export interface IDevWsLogger {
  forward: (entry: DevWsLogEntry) => void;
}

/**
 * 创建一个仅在开发环境启用的 WebSocket 日志转发器
 *
 * 使用方式（任意 RN 项目通用）：
 *
 *   const devWsLogger = createDevWsLogger('ws://localhost:8888/message');
 *   devWsLogger.forward({
 *     level: 'info',
 *     message: 'hello',
 *     timestamp: new Date().toISOString(),
 *     context: { foo: 'bar' },
 *   });
 */
export const createDevWsLogger = (url?: string): IDevWsLogger => {
  // 非开发环境或未配置 URL 时，返回空实现
  if (!__DEV__ || !url) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      forward: (_entry: DevWsLogEntry) => {},
    };
  }

  let ws: WebSocket | undefined;
  let wsConnected = false;
  const wsQueue: string[] = [];

  const initWebSocket = () => {
    try {
      ws = new WebSocket(url);

      ws.onopen = () => {
        wsConnected = true;

        wsQueue.forEach((msg) => {
          ws?.send(msg);
        });
        wsQueue.length = 0;
      };

      ws.onclose = () => {
        wsConnected = false;
        ws = undefined;
      };

      ws.onerror = () => {
        wsConnected = false;
      };
    } catch {
      wsConnected = false;
      ws = undefined;
    }
  };

  // 初始化连接
  initWebSocket();

  const forward = (entry: DevWsLogEntry) => {
    if (!__DEV__ || !url) {
      return;
    }

    const payload = JSON.stringify({
      type: 'js-log',
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp,
      context: entry.context ?? null,
    });

    if (ws && wsConnected) {
      try {
        ws.send(payload);
      } catch {
        wsQueue.push(payload);
      }
    } else {
      wsQueue.push(payload);
    }
  };

  return {
    forward,
  };
};


