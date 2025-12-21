# ScanCode 扫码组件

基于 `react-native-vision-camera` 实现的通用扫码组件，支持多种条码格式识别、区域限制、结果过滤等功能。

## 功能特性

- ✅ 支持多种条码格式（QR码、EAN、CODE128、CODE39等）
- ✅ 权限自动检查和请求（使用 `usePermission` hook）
- ✅ 识别区域限制
- ✅ 正则表达式过滤
- ✅ 结果积累模式
- ✅ 闪光灯控制
- ✅ 震动和声音反馈
- ✅ 扫描动画效果
- ✅ 超时处理
- ✅ 错误处理和自动重试

## 安装依赖

组件依赖以下库（已在项目中安装）：

- `react-native-vision-camera`
- `react-native-permissions`
- `~/hooks/usePermission`

## 基础使用

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScanCode, SUPPORT_CODE_TYPE } from '~/components/ScanCode';

const ScanScreen = () => {
  const handleBarCodeRead = (result) => {
    console.log('扫码结果:', result.data);
  };

  return (
    <View style={styles.container}>
      <ScanCode onBarCodeRead={handleBarCodeRead} codeFormatList={[SUPPORT_CODE_TYPE.QRCODE]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanScreen;
```

## 高级使用

### 带区域限制和遮罩

```tsx
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCAN_AREA_HEIGHT = 300;
const OFFSET_TOP = 200;

<ScanCode
  fastMode
  needLimitArea={true}
  codeFormatList={[SUPPORT_CODE_TYPE.NONE]} // 支持所有格式
  scanArea={{
    scanWidth: SCREEN_WIDTH,
    scanHeight: SCAN_AREA_HEIGHT,
    topOffset: OFFSET_TOP,
  }}
  maskColor='#99000000'
  needAnim={true}
  onBarCodeRead={handleBarCodeRead}
/>;
```

### 带正则过滤

```tsx
<ScanCode
  fastMode
  resultIncludeRegs={[
    /^[A-Z0-9]{4,}\/([A-Z0-9]{8,15})$/, // SN格式
    /^86\d{13}$/, // IMEI格式
  ]}
  resultExcludeRegs={[
    /^test/i, // 排除test开头的
  ]}
  onBarCodeRead={handleBarCodeRead}
/>
```

### 带超时处理

```tsx
<ScanCode
  fastMode
  singleScanOutTime={10000} // 10秒超时
  onBarCodeReadTimeout={() => {
    console.log('扫码超时');
    // 提示用户调整扫码位置
  }}
  onBarCodeRead={handleBarCodeRead}
/>
```

### 带结果积累

```tsx
<ScanCode
  fastMode
  openAccumulateResult={true}
  accumulateTimeInterval={500} // 500ms内积累结果
  onBarCodeRead={handleBarCodeRead}
/>
```

### 带辅助功能

```tsx
const [flashOn, setFlashOn] = useState(false);

<ScanCode
  fastMode
  flashlight={flashOn}
  vibrate={true}
  beep={true}
  onBarCodeRead={handleBarCodeRead}
/>;
```

## API 文档

### Props

| 属性名                 | 类型      | 默认值                           | 说明                       |
| ---------------------- | --------- | -------------------------------- | -------------------------- |
| defaultCanScan         | boolean   | true                             | 是否可以扫码               |
| codeFormatList         | number[]  | [EAN13, CODE39, CODE128, QRCODE] | 支持的条码格式列表         |
| scanArea               | IScanArea | null                             | 扫码区域配置               |
| maskColor              | string    | '#99000000'                      | 非扫描区域背景色           |
| needLimitArea          | boolean   | false                            | 是否限制区域扫码           |
| needAnim               | boolean   | false                            | 是否需要扫描动画           |
| flashlight             | boolean   | false                            | 是否开启手电筒             |
| vibrate                | boolean   | false                            | 是否开启震动               |
| beep                   | boolean   | false                            | 是否开启声音提示           |
| fastMode               | boolean   | false                            | 是否快速扫描模式           |
| resultIncludeRegs      | RegExp[]  | []                               | 保留结果的正则规则数组     |
| resultExcludeRegs      | RegExp[]  | []                               | 排除结果的正则规则数组     |
| singleScanOutTime      | number    | null                             | 单次扫码超时时间（毫秒）   |
| accumulateTimeInterval | number    | 500                              | 结果积累时间窗口（毫秒）   |
| openEmptyReturnResults | boolean   | true                             | 是否开启空结果返回         |
| openAccumulateResult   | boolean   | false                            | 是否开启结果积累           |
| onBarCodeRead          | function  | -                                | 扫码结果回调               |
| onBarCodeReadList      | function  | -                                | 扫码结果集回调（快速模式） |
| onBarCodeReadNative    | function  | -                                | 原生端扫码结果回调         |
| onBarCodeReadTimeout   | function  | -                                | 超时回调                   |
| onCameraOpenError      | function  | -                                | 相机权限错误回调           |
| onCameraError          | function  | -                                | 相机错误回调               |
| onTransformOriginCodes | function  | -                                | 原始结果转换函数           |
| style                  | ViewStyle | -                                | 容器样式                   |

### 回调参数

#### onBarCodeRead

```typescript
interface IBarCodeReadResult {
  data: string; // 扫码内容
  type: number; // 条码类型
  resultList?: IScanResultItem[]; // 识别结果列表（快速模式）
}
```

#### onBarCodeReadList

```typescript
interface IScanResultItem {
  data: string; // 条码内容
  type: number; // 条码类型
}
```

## 支持的条码格式

使用 `SUPPORT_CODE_TYPE` 常量：

- `SUPPORT_CODE_TYPE.NONE` - 支持所有格式
- `SUPPORT_CODE_TYPE.QRCODE` - 二维码
- `SUPPORT_CODE_TYPE.EAN13` - EAN-13
- `SUPPORT_CODE_TYPE.EAN8` - EAN-8
- `SUPPORT_CODE_TYPE.CODE128` - CODE128
- `SUPPORT_CODE_TYPE.CODE39` - CODE39
- `SUPPORT_CODE_TYPE.CODE93` - CODE93
- `SUPPORT_CODE_TYPE.CODABAR` - CODABAR
- `SUPPORT_CODE_TYPE.UPCA` - UPC-A
- `SUPPORT_CODE_TYPE.UPCE` - UPC-E
- `SUPPORT_CODE_TYPE.PDF417` - PDF417
- 更多格式请参考 `types.ts`

## 注意事项

1. **权限要求**：组件会自动检查相机权限，如果权限被拒绝，需要用户手动在设置中开启
2. **设备兼容性**：需要设备支持相机功能
3. **性能优化**：快速模式（fastMode）可以提升识别速度
4. **区域限制**：
   - 标准版本（ScanCode）：不提供坐标信息，区域过滤功能受限
   - 坐标版本（ScanCodeWithCoordinates）：需要安装 `react-native-reanimated`，支持完整的区域过滤功能
5. **声音提示**：已实现基础的声音播放功能（使用震动反馈），如需自定义音效请安装 `react-native-sound`

## 版本说明

### 标准版本（ScanCode.tsx）

- ✅ 无需额外依赖
- ✅ 使用 `useCodeScanner`，简单高效
- ⚠️ 不支持坐标信息，区域过滤功能受限

### 坐标版本（ScanCodeWithCoordinates.tsx）

- ✅ 支持完整的坐标信息
- ✅ 支持精确的区域过滤
- ⚠️ 需要安装 `react-native-reanimated`

**安装坐标版本依赖：**

```bash
yarn add react-native-reanimated
```

然后在 `babel.config.js` 中添加：

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... 其他插件
    'react-native-reanimated/plugin', // 必须放在最后
  ],
};
```

**使用坐标版本：**

```tsx
import { ScanCodeWithCoordinates } from '~/components/ScanCode/ScanCodeWithCoordinates';

<ScanCodeWithCoordinates
  needLimitArea={true}
  scanArea={{...}}
  onBarCodeRead={handleBarCodeRead}
/>
```

## 示例

完整示例请参考 `src/pages/ScanExample/index.tsx`
