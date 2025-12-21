# 组件文档索引

本文档提供了项目中所有组件的使用指南。每个组件都有独立的文档，包含详细的使用说明、API 文档和最佳实践。

## 组件列表

### [ScanCode - 扫码组件](./ScanCode.md)
基于 `react-native-vision-camera` 实现的扫码组件，支持多种条码格式识别。

**快速开始**：
```typescript
import { ScanCode } from '~/components/ScanCode';
```

### [NavigationBar - 导航栏组件](./NavigationBar.md)
功能丰富的自定义导航栏组件，支持返回按钮、标题、右侧多按钮、搜索框等功能。

**快速开始**：
```typescript
import { NavigationBar, useNavigationBar, withNavigationBar } from '~/components/NavigationBar';
```

### [ErrorBoundary - 错误边界组件](./ErrorBoundary.md)
错误边界组件，用于捕获子组件树中的 JavaScript 错误并显示降级 UI。

**快速开始**：
```typescript
import { ErrorBoundary } from '~/components/ErrorBoundary';
```

### [SafeAreaWrapper - 安全区域包裹组件](./SafeAreaWrapper.md)
安全区域包裹组件，用于确保内容在安全区域内显示。

**快速开始**：
```typescript
import { SafeAreaWrapper } from '~/components/SafeAreaWrapper';
```

### [SplashScreen - 启动屏组件](./SplashScreen.md)
启动屏组件，用于应用启动时显示的加载界面。

**快速开始**：
```typescript
import { SplashScreen } from '~/components/SplashScreen';
```

### [SvgIcons - SVG 图标组件](./SvgIcons.md)
提供了一系列常用的 SVG 图标组件。

**快速开始**：
```typescript
import { BackArrowIcon, SearchIcon } from '~/components/SvgIcons';
```

## 组件选择决策树

### 需要扫码功能？
- ✅ **是** → 使用 [ScanCode](./ScanCode.md)
- ❌ **否** → 继续

### 需要导航栏？
- ✅ **是** →
  - 配置相对固定？ → 使用 `NavigationBar` 组件
  - 需要动态更新？ → 使用 `useNavigationBar` Hook
  - 希望自动添加？ → 使用 `withNavigationBar` HOC
- ❌ **否** → 继续

### 需要错误处理？
- ✅ **是** → 使用 [ErrorBoundary](./ErrorBoundary.md)
- ❌ **否** → 继续

### 需要处理安全区域？
- ✅ **是** → 使用 [SafeAreaWrapper](./SafeAreaWrapper.md)
- ❌ **否** → 继续

### 需要启动屏？
- ✅ **是** → 使用 [SplashScreen](./SplashScreen.md)
- ❌ **否** → 继续

### 需要图标？
- ✅ **是** → 使用 [SvgIcons](./SvgIcons.md)
- ❌ **否** → 完成

## 常见问题

### Q: 如何选择合适的组件？

A: 参考上面的组件选择决策树，根据你的需求选择合适的组件。每个组件的文档中都详细说明了使用场景。

### Q: 组件文档在哪里？

A: 每个组件都有独立的文档文件，在 `docs/components/` 目录下。点击上面的链接即可查看。

### Q: 如何贡献新的组件？

A: 在 `src/components/` 目录下创建新组件，然后在 `docs/components/` 目录下创建对应的文档文件。

## 总结

选择合适的组件可以大大提高开发效率和代码质量。建议：

1. **统一使用方式**：在项目中统一组件的使用方式，保持代码一致性
2. **遵循最佳实践**：按照文档中的最佳实践使用组件
3. **及时更新文档**：当组件功能发生变化时，及时更新文档

如有问题或建议，请联系开发团队。

