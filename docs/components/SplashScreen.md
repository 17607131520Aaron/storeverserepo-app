# SplashScreen - 启动屏组件

## 概述

`SplashScreen` 是一个启动屏组件，用于应用启动时显示的加载界面。

## 使用场景

- ✅ **应用启动**：显示应用 Logo 和加载动画
- ✅ **数据加载**：在应用初始化数据时显示
- ✅ **品牌展示**：展示应用品牌和 slogan

## 何时选择 SplashScreen

- 应用启动时需要显示加载状态
- 需要展示应用品牌信息
- 需要在数据加载完成前显示占位界面

## 基础用法

```typescript
import { SplashScreen } from '~/components/SplashScreen';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 初始化应用数据
    initializeApp().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <SplashScreen
        appName="仓储管理"
        subtitle="智能仓储解决方案"
        showLoading={true}
      />
    );
  }

  return <YourApp />;
};
```

## API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `appName` | `string` | `'仓储管理'` | 应用名称 |
| `subtitle` | `string` | `'智能仓储解决方案'` | 副标题/slogan |
| `showLoading` | `boolean` | `true` | 是否显示加载动画 |
| `backgroundColor` | `string` | `'#FFFFFF'` | 背景颜色 |
| `primaryColor` | `string` | `'#007AFF'` | 主色调 |

## 最佳实践

1. **固定颜色**：启动屏使用固定颜色，不依赖主题（因为主题可能还未加载）
2. **快速显示**：确保启动屏能快速显示，避免白屏
3. **加载状态**：在数据加载完成前显示加载动画

## 常见问题

### Q: 启动屏应该显示多长时间？

A: 建议显示时间不超过 3 秒，避免用户等待过久。可以在数据加载完成后立即隐藏。

### Q: 如何自定义启动屏的样式？

A: 通过 `backgroundColor` 和 `primaryColor` props 可以自定义颜色，如需更多自定义，可以修改组件源码或创建自定义启动屏组件。

### Q: 启动屏是否支持主题？

A: 不支持，启动屏使用固定颜色，因为主题可能在启动屏显示时还未加载完成。

