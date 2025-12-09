/**
 * 统一的 Toast 通知工具
 * 提供应用级别的消息提示功能
 */

// 这里可以根据实际使用的 UI 库进行适配
// 例如: react-native-toast-message, @ant-design/react-native 等

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
}

/**
 * 显示 Toast 消息
 * @param message - 要显示的消息内容
 * @param options - Toast 配置选项
 */
export const showToast = (message: string, options?: ToastOptions): void => {
  // TODO: 根据实际使用的 UI 库实现
  // 示例实现:
  // ToastView.add(message, options?.duration);

  // 临时使用 console 输出,实际项目中应替换为真实的 Toast 组件
  console.log(`[Toast]: ${message}`, options);
};

/**
 * 显示成功消息
 */
export const showSuccess = (message: string, options?: ToastOptions): void => {
  showToast(message, options);
};

/**
 * 显示错误消息
 */
export const showError = (message: string, options?: ToastOptions): void => {
  showToast(message, options);
};

/**
 * 显示警告消息
 */
export const showWarning = (message: string, options?: ToastOptions): void => {
  showToast(message, options);
};

/**
 * 显示信息消息
 */
export const showInfo = (message: string, options?: ToastOptions): void => {
  showToast(message, options);
};
