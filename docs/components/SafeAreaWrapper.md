# SafeAreaWrapper - 安全区域包裹组件

## 概述

`SafeAreaWrapper` 是一个安全区域包裹组件，用于确保内容在安全区域内显示，避免被刘海屏、底部指示器等遮挡。

## 使用场景

- ✅ **全屏页面**：需要内容避开系统 UI（刘海、底部指示器）
- ✅ **底部操作栏**：确保底部按钮不被系统手势区域遮挡
- ✅ **列表页面**：确保列表内容在安全区域内滚动

## 何时选择 SafeAreaWrapper

- 页面内容需要避开系统 UI 区域
- 使用自定义导航栏的页面（NavigationBar 已处理顶部）
- 需要精确控制安全区域边缘

## 基础用法

### 1. 全屏页面（包含顶部和底部）

```typescript
import { SafeAreaWrapper } from '~/components/SafeAreaWrapper';

const FullScreenPage: React.FC = () => {
  return (
    <SafeAreaWrapper edges={['top', 'bottom']}>
      <View>
        {/* 页面内容 */}
      </View>
    </SafeAreaWrapper>
  );
};
```

### 2. 有导航栏的页面（只处理底部）

```typescript
// NavigationBar 已处理顶部安全区域
<SafeAreaWrapper edges={['bottom']}>
  <View>
    {/* 页面内容 */}
  </View>
</SafeAreaWrapper>
```

### 3. 只处理顶部

```typescript
<SafeAreaWrapper edges={['top']}>
  <View>
    {/* 页面内容 */}
  </View>
</SafeAreaWrapper>
```

## API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 子组件 |
| `edges` | `('top' \| 'right' \| 'bottom' \| 'left')[]` | `['top', 'bottom']` | 需要处理的安全区域边缘 |

## 最佳实践

1. **与 NavigationBar 配合**：如果页面使用了 NavigationBar，`edges` 应该只包含 `['bottom']`
2. **避免重复包裹**：不要在使用 NavigationBar 的页面同时处理顶部安全区域
3. **默认值**：大多数情况下使用默认值 `['top', 'bottom']` 即可

## 常见问题

### Q: SafeAreaWrapper 和 NavigationBar 一起使用时需要注意什么？

A: NavigationBar 已处理顶部安全区域，所以 SafeAreaWrapper 的 `edges` 应该只包含 `['bottom']`。

### Q: 如何只处理底部安全区域？

A: 传入 `edges={['bottom']}` 即可。

### Q: 可以处理左右两侧的安全区域吗？

A: 可以，传入 `edges={['left', 'right']}` 或包含在数组中即可。

