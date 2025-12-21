/**
 * 扫码组件类型定义
 */

import type { ViewStyle } from 'react-native';

/**
 * 支持的条码格式常量
 */
export const SUPPORT_CODE_TYPE = {
  NONE: 0,
  EAN8: 8,
  UPCE: 9,
  ISBN10: 10,
  UPCA: 12,
  EAN13: 13,
  ISBN13: 14,
  I25: 25,
  DATABAR: 34,
  DATABAR_EXP: 35,
  CODABAR: 38,
  CODE39: 39,
  PDF417: 57,
  QRCODE: 64,
  CODE93: 93,
  CODE128: 128,
  UNKNOWN: '-1',
} as const;

/**
 * 过滤类型常量
 */
export const FILTER_BY_TYPE = {
  NULL: 'null', // 原生端返回为空
  AREA: 'ares', // 因位置被过滤
  REG: 'reg', // 因正则被过滤
} as const;

/**
 * 扫码区域配置
 */
export interface IScanArea {
  scanWidth: number; // 扫码区域宽度（dp）
  scanHeight: number; // 扫码区域高度（dp）
  topOffset: number; // 距离顶部的偏移量（dp）
}

/**
 * 扫码结果项
 */
export interface IScanResultItem {
  data: string; // 条码内容
  type: number; // 条码类型
  top_dp?: number; // 顶部坐标（dp）
  bottom_dp?: number; // 底部坐标（dp）
  left_dp?: number; // 左侧坐标（dp）
  right_dp?: number; // 右侧坐标（dp）
}

/**
 * 标准模式回调参数
 */
export interface IBarCodeReadResult {
  data: string; // 扫码内容
  type: number; // 条码类型
  target?: object; // 目标信息
  processCost?: number; // 处理耗时
  totalCost?: number; // 总耗时
  resultList?: IScanResultItem[]; // 识别结果列表（快速模式）
}

/**
 * 原生端扫码结果回调参数
 */
export interface INativeBarCodeResult {
  data: string; // 条码内容
  type: number; // 条码类型
  filterBy: 'null' | 'ares' | 'reg'; // 过滤原因
}

/**
 * 扫码组件 Props
 */
export interface IScanCodeProps {
  /** 是否可以扫码 */
  defaultCanScan?: boolean;
  /** 支持的条码格式列表 */
  codeFormatList?: number[];
  /** 扫码区域配置 */
  scanArea?: IScanArea;
  /** 非扫描区域背景色 */
  maskColor?: string;
  /** 是否限制区域扫码 */
  needLimitArea?: boolean;
  /** 是否需要扫描动画 */
  needAnim?: boolean;
  /** 是否开启手电筒 */
  flashlight?: boolean;
  /** 是否开启震动 */
  vibrate?: boolean;
  /** 是否开启声音提示 */
  beep?: boolean;
  /** 是否快速扫描模式 */
  fastMode?: boolean;
  /** 保留结果的正则规则数组 */
  resultIncludeRegs?: RegExp[];
  /** 排除结果的正则规则数组 */
  resultExcludeRegs?: RegExp[];
  /** 业务侧标识，用于数据上报 */
  businessType?: string;
  /** 单次扫码超时时间（毫秒） */
  singleScanOutTime?: number;
  /** 结果积累时间窗口（毫秒） */
  accumulateTimeInterval?: number;
  /** 是否打开时长上报 */
  openReportTime?: boolean;
  /** 是否打开成功率上报 */
  openReportSuccess?: boolean;
  /** 是否开启空结果返回 */
  openEmptyReturnResults?: boolean;
  /** 是否开启结果积累 */
  openAccumulateResult?: boolean;
  /** 扫码结果回调 */
  onBarCodeRead?: (result: IBarCodeReadResult) => void;
  /** 扫码结果集回调（快速模式） */
  onBarCodeReadList?: (results: IScanResultItem[]) => void;
  /** 原生端扫码结果回调 */
  onBarCodeReadNative?: (results: INativeBarCodeResult[]) => void;
  /** 超时回调 */
  onBarCodeReadTimeout?: () => void;
  /** 相机权限错误回调 */
  onCameraOpenError?: (error: Error) => void;
  /** 相机错误回调 */
  onCameraError?: (error: Error) => void;
  /** 原始结果转换函数（用于自动纠错） */
  onTransformOriginCodes?: (code: string) => string;
  /** 容器样式 */
  style?: ViewStyle;
}

/**
 * 扫码组件实例方法接口
 */
export interface IScanCodeRef {
  /** 开启扫码 */
  startScanning: () => void;
  /** 关闭扫码 */
  stopScanning: () => void;
}
