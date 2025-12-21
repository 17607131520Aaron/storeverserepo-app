/**
 * 扫码组件常量定义
 */

import { SUPPORT_CODE_TYPE } from './types';

/**
 * 默认支持的条码格式列表
 */
export const DEFAULT_SUPPORT_FORMAT_LIST = [
  SUPPORT_CODE_TYPE.EAN13,
  SUPPORT_CODE_TYPE.CODE39,
  SUPPORT_CODE_TYPE.CODE128,
  SUPPORT_CODE_TYPE.QRCODE,
];

/**
 * 仅支持旧扫码的格式列表（需要降级到标准模式）
 */
export const LEGACY_ONLY_FORMATS = [SUPPORT_CODE_TYPE.DATABAR, SUPPORT_CODE_TYPE.DATABAR_EXP];

/**
 * 区域判断容差（dp）
 */
export const AREA_TOLERANCE = 20;

/**
 * 默认积累时间窗口（毫秒）
 */
export const DEFAULT_ACCUMULATE_TIME_INTERVAL = 500;

/**
 * CODABAR 格式首尾字母正则
 */
export const CODABAR_PREFIX_SUFFIX_REGEX = /^[A-D].*[A-D]$/;
