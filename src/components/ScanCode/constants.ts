import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
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

/**
 * 获取相机权限常量
 */
export const getCameraPermission = () => {
  if (Platform.OS === 'ios') {
    return PERMISSIONS.IOS.CAMERA;
  }
  return PERMISSIONS.ANDROID.CAMERA;
};

/**
 * 将 vision-camera 的 Code 类型转换为条码类型数字
 */
export const convertCodeTypeToNumber = (codeType: string): number => {
  const typeMap: Record<string, number> = {
    qr: 64, // QRCODE
    'ean-13': 13, // EAN13
    'ean-8': 8, // EAN8
    'code-128': 128, // CODE128
    'code-39': 39, // CODE39
    'code-93': 93, // CODE93
    codabar: 38, // CODABAR
    'upc-a': 12, // UPCA
    'upc-e': 9, // UPCE
    'pdf-417': 57, // PDF417
    itf: 25, // I25
    'data-matrix': 0, // 暂不支持，返回 NONE
  };
  return typeMap[codeType.toLowerCase()] ?? 0;
};

/**
 * 处理 CODABAR 格式（去除首尾字母）
 */
export const processCodabarCode = (code: string): string => {
  if (CODABAR_PREFIX_SUFFIX_REGEX.test(code) && code.length > 2) {
    return code.slice(1, -1);
  }
  return code;
};
