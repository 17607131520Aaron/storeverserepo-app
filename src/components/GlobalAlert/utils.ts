/**
 * 全局提示框工具函数
 */

import { useGlobalAlertStore } from './store';

import type { IGlobalAlertOptions } from './types';

/**
 * 显示全局提示框
 * @param options 提示框配置选项
 */
export const showGlobalAlert = (options: IGlobalAlertOptions): void => {
  const store = useGlobalAlertStore.getState();
  store.show(options);
};

/**
 * 隐藏全局提示框
 */
export const hideGlobalAlert = (): void => {
  const store = useGlobalAlertStore.getState();
  store.hide();
};

/**
 * 显示简单的文本提示框
 * @param content 提示内容
 * @param title 标题（可选）
 */
export const showAlert = (content: string, title?: string): void => {
  showGlobalAlert({
    title,
    content,
  });
};

/**
 * 显示JSON数据提示框
 * @param data 要显示的JSON数据
 * @param title 标题（可选）
 */
export const showJsonAlert = (data: object, title?: string): void => {
  showGlobalAlert({
    title: title || '数据详情',
    content: data,
  });
};

