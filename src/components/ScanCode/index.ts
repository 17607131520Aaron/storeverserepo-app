/**
 * 扫码组件统一导出
 */

// 标准版本（无需额外依赖）
export { ScanCode } from './ScanCode';

// 坐标版本（需要 react-native-reanimated）
// export { ScanCodeWithCoordinates } from './ScanCodeWithCoordinates';

// 常量和类型
export { SUPPORT_CODE_TYPE, FILTER_BY_TYPE } from './types';
export type {
  IScanCodeProps,
  IScanCodeRef,
  IScanArea,
  IScanResultItem,
  IBarCodeReadResult,
  INativeBarCodeResult,
} from './types';
