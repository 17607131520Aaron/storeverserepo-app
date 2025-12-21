# ErrorBoundary - 错误边界组件

## 概述

`ErrorBoundary` 是一个错误边界组件，用于捕获子组件树中的 JavaScript 错误并显示降级 UI，防止整个应用崩溃。

## 使用场景

- ✅ **全局错误捕获**：在应用根组件包裹，捕获所有未处理的错误
- ✅ **页面级错误捕获**：在特定页面包裹，防止页面崩溃影响其他页面
- ✅ **组件级错误捕获**：在关键组件外包裹，提供局部错误处理

## 何时选择 ErrorBoundary

- 需要防止应用因未捕获的错误而崩溃
- 需要向用户展示友好的错误提示
- 需要记录错误日志用于问题排查
- 需要提供错误恢复机制（重试功能）

## 基础用法

### 1. 全局错误边界（推荐）

```typescript
import { ErrorBoundary } from '~/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 上报错误到监控平台
        reportError(error, errorInfo);
      }}
      onRetry={() => {
        // 重试逻辑，如重新加载数据
        window.location.reload();
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
};
```

### 2. 页面级错误边界

```typescript
import { ErrorBoundary } from '~/components/ErrorBoundary';

const DetailPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <PageContent />
    </ErrorBoundary>
  );
};
```

### 3. 自定义错误 UI

```typescript
<ErrorBoundary
  fallback={
    <View style={styles.errorContainer}>
      <Text>页面加载失败，请稍后重试</Text>
      <Button title="重试" onPress={handleRetry} />
    </View>
  }
>
  <YourComponent />
</ErrorBoundary>
```

## API 文档

### Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `children` | `ReactNode` | 子组件 |
| `fallback` | `ReactNode` | 自定义降级 UI（可选） |
| `onError` | `(error: Error, errorInfo: ErrorInfo) => void` | 错误回调 |
| `onRetry` | `() => void` | 重试回调 |

## 默认错误 UI

如果不提供 `fallback`，组件会使用默认的 `ErrorFallback` 组件，显示：
- 错误标题："出错了"
- 错误消息：错误对象的 `message` 属性
- 重试按钮（如果提供了 `onRetry`）

## 最佳实践

1. **全局使用**：在应用根组件使用 ErrorBoundary，确保所有错误都能被捕获
2. **错误上报**：在 `onError` 回调中上报错误到监控平台（如 Sentry）
3. **用户友好**：提供清晰的错误提示和重试机制
4. **避免过度使用**：不要在每个组件外都包裹 ErrorBoundary，只在关键位置使用

## 常见问题

### Q: ErrorBoundary 能捕获哪些错误？

A: ErrorBoundary 只能捕获 React 组件树中的错误，无法捕获：
- 事件处理器中的错误（需要在事件处理器中使用 try-catch）
- 异步代码中的错误（需要在 Promise.catch 中处理）
- 服务端渲染错误

### Q: 如何自定义错误 UI？

A: 传入 `fallback` prop，提供一个自定义的 React 组件作为错误降级 UI。

### Q: 如何实现错误重试？

A: 传入 `onRetry` prop，提供一个回调函数，在用户点击重试按钮时执行。

