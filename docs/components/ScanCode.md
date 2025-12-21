# ScanCode - 扫码组件

## 概述

`ScanCode` 是一个基于 `react-native-vision-camera` 实现的扫码组件，支持多种条码格式识别，提供丰富的配置选项和回调函数。

## 使用场景

- ✅ **商品扫码**：扫描商品条码、二维码
- ✅ **库存管理**：扫描物料编码、串码 SN
- ✅ **出入库操作**：批量扫描条码进行出入库
- ✅ **订单处理**：扫描订单二维码

## 何时选择 ScanCode

- 需要识别多种条码格式（QR码、EAN13、CODE128 等）
- 需要自定义扫码区域、动画效果
- 需要控制扫码行为（震动、声音、手电筒等）
- 需要过滤和验证扫码结果

## 基础用法

```typescript
import React, { useRef } from 'react';
import { ScanCode, type IScanCodeRef, type IBarCodeReadResult } from '~/components/ScanCode';

const ScanPage: React.FC = () => {
  const scanCodeRef = useRef<IScanCodeRef>(null);

  const handleBarCodeRead = (result: IBarCodeReadResult) => {
    console.log('扫描结果:', result.data);
    console.log('条码类型:', result.type);
  };

  return (
    <ScanCode
      ref={scanCodeRef}
      defaultCanScan={true}
      vibrate={true}
      beep={true}
      needAnim={true}
      onBarCodeRead={handleBarCodeRead}
    />
  );
};
```

## API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `defaultCanScan` | `boolean` | `true` | 是否可以扫码 |
| `codeFormatList` | `number[]` | `[13, 39, 128, 64]` | 支持的条码格式列表 |
| `scanArea` | `IScanArea` | - | 扫码区域配置 |
| `maskColor` | `string` | `'#99000000'` | 非扫描区域背景色 |
| `needLimitArea` | `boolean` | `false` | 是否限制区域扫码 |
| `needAnim` | `boolean` | `false` | 是否需要扫描动画 |
| `flashlight` | `boolean` | `false` | 是否开启手电筒 |
| `vibrate` | `boolean` | `false` | 是否开启震动 |
| `beep` | `boolean` | `false` | 是否开启声音提示 |
| `fastMode` | `boolean` | `false` | 是否快速扫描模式 |
| `resultIncludeRegs` | `RegExp[]` | `[]` | 保留结果的正则规则数组 |
| `resultExcludeRegs` | `RegExp[]` | `[]` | 排除结果的正则规则数组 |
| `singleScanOutTime` | `number` | - | 单次扫码超时时间（毫秒） |
| `accumulateTimeInterval` | `number` | `500` | 结果积累时间窗口（毫秒） |
| `openAccumulateResult` | `boolean` | `false` | 是否开启结果积累 |
| `onBarCodeRead` | `(result: IBarCodeReadResult) => void` | - | 扫码结果回调 |
| `onBarCodeReadList` | `(results: IScanResultItem[]) => void` | - | 扫码结果集回调（快速模式） |
| `onBarCodeReadTimeout` | `() => void` | - | 超时回调 |
| `onCameraOpenError` | `(error: Error) => void` | - | 相机权限错误回调 |
| `onCameraError` | `(error: Error) => void` | - | 相机错误回调 |
| `onTransformOriginCodes` | `(code: string) => string` | - | 原始结果转换函数（用于自动纠错） |

### Ref 方法

| 方法 | 说明 |
|------|------|
| `startScanning()` | 开启扫码 |
| `stopScanning()` | 关闭扫码 |

## 支持的条码格式

```typescript
import { SUPPORT_CODE_TYPE } from '~/components/ScanCode';

// 常用格式
SUPPORT_CODE_TYPE.QRCODE      // 64 - 二维码
SUPPORT_CODE_TYPE.EAN13        // 13 - EAN-13
SUPPORT_CODE_TYPE.CODE128     // 128 - CODE-128
SUPPORT_CODE_TYPE.CODE39       // 39 - CODE-39
SUPPORT_CODE_TYPE.EAN8         // 8 - EAN-8
SUPPORT_CODE_TYPE.UPCA         // 12 - UPC-A
SUPPORT_CODE_TYPE.UPCE         // 9 - UPC-E
SUPPORT_CODE_TYPE.CODABAR      // 38 - CODABAR
SUPPORT_CODE_TYPE.PDF417       // 57 - PDF417
```

## 高级用法

### 1. 自定义扫码区域

```typescript
<ScanCode
  scanArea={{
    scanWidth: 300,
    scanHeight: 300,
    topOffset: 100,
  }}
  needLimitArea={true}
  maskColor="#80000000"
/>
```

### 2. 结果过滤

```typescript
<ScanCode
  // 只接受以 "SN" 开头的条码
  resultIncludeRegs={[/^SN/]}
  // 排除包含 "TEST" 的条码
  resultExcludeRegs={[/TEST/]}
  onBarCodeRead={handleBarCodeRead}
/>
```

### 3. 结果积累模式

```typescript
<ScanCode
  openAccumulateResult={true}
  accumulateTimeInterval={500}
  onBarCodeRead={(result) => {
    // 在时间窗口内多次扫描同一条码，返回识别次数最多的结果
    console.log('最终结果:', result.data);
  }}
/>
```

### 4. 快速扫描模式

```typescript
<ScanCode
  fastMode={true}
  onBarCodeReadList={(results) => {
    // 返回所有识别到的条码列表
    results.forEach(result => {
      console.log('条码:', result.data, '类型:', result.type);
    });
  }}
/>
```

### 5. 手动控制扫码

```typescript
const scanCodeRef = useRef<IScanCodeRef>(null);

// 开始扫码
const startScan = () => {
  scanCodeRef.current?.startScanning();
};

// 停止扫码
const stopScan = () => {
  scanCodeRef.current?.stopScanning();
};
```

## 最佳实践

1. **权限处理**：组件会自动处理相机权限，但建议在 `onCameraOpenError` 中处理权限被拒绝的情况
2. **性能优化**：使用 `fastMode` 时注意性能影响，建议在需要批量扫描时使用
3. **错误处理**：始终实现 `onCameraError` 回调来处理相机错误
4. **结果验证**：使用 `resultIncludeRegs` 和 `resultExcludeRegs` 进行结果过滤，避免无效数据

## 常见问题

### Q: 扫描后无法继续扫描？

A: 检查 `isActive` 状态是否被设置为 `false`，确保扫描回调中没有停止扫码的逻辑。

### Q: 如何自定义扫码区域？

A: 使用 `scanArea` prop 设置扫码区域的宽度、高度和顶部偏移量，并设置 `needLimitArea={true}`。

### Q: 如何过滤无效的扫码结果？

A: 使用 `resultIncludeRegs` 和 `resultExcludeRegs` 传入正则表达式数组来过滤结果。

