/**
 * 全局提示框类型定义
 */

/** 提示框内容类型 */
export type AlertContentType = string | object | React.ReactNode;

/** 提示框配置选项 */
export interface IGlobalAlertOptions {
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: AlertContentType;
  /** 是否可关闭（点击背景关闭） */
  closable?: boolean;
  /** 关闭按钮文本 */
  closeText?: string;
  /** 自定义样式 */
  style?: {
    /** 弹窗位置 */
    position?: 'center' | 'top' | 'bottom';
    /** 弹窗宽度 */
    width?: number | string;
    /** 弹窗最大高度 */
    maxHeight?: number | string;
  };
  /** 关闭回调 */
  onClose?: () => void;
}

/** 全局提示框状态 */
export interface IGlobalAlertState {
  /** 是否显示 */
  visible: boolean;
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: AlertContentType;
  /** 是否可关闭 */
  closable: boolean;
  /** 关闭按钮文本 */
  closeText: string;
  /** 样式配置 */
  style: Required<Pick<IGlobalAlertOptions['style'], 'position' | 'width' | 'maxHeight'>>;
  /** 关闭回调 */
  onClose?: () => void;
  /** 显示提示框 */
  show: (options: IGlobalAlertOptions) => void;
  /** 隐藏提示框 */
  hide: () => void;
}

