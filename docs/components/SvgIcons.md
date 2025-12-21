# SvgIcons - SVG 图标组件

## 概述

`SvgIcons` 提供了一系列常用的 SVG 图标组件，基于 `react-native-svg` 实现。

## 使用场景

- ✅ **导航栏图标**：返回按钮、搜索图标等
- ✅ **操作按钮**：设置、更多、关闭等
- ✅ **状态指示**：勾选、加号、减号等

## 何时选择 SvgIcons

- 需要统一的图标风格
- 需要自定义图标颜色和大小
- 需要轻量级的图标解决方案（无需图片资源）

## 可用图标

- `BackArrowIcon` - 返回箭头
- `SearchIcon` - 搜索图标
- `ChevronRightIcon` - 右箭头
- `CloseIcon` - 关闭图标
- `MenuIcon` - 菜单图标（三条横线）
- `MoreIcon` - 更多图标（三个点）
- `CheckIcon` - 勾选图标
- `PlusIcon` - 加号图标
- `MinusIcon` - 减号图标
- `SettingsIcon` - 设置图标
- `ScanIcon` - 扫码图标
- `FlashlightIcon` - 手电筒图标
- `KeyboardIcon` - 键盘/手动录入图标

## 基础用法

```typescript
import { BackArrowIcon, SearchIcon, CheckIcon } from '~/components/SvgIcons';

// 使用默认样式
<BackArrowIcon />

// 自定义颜色和大小
<SearchIcon color="#007AFF" size={20} />

// 在按钮中使用
<TouchableOpacity onPress={handleBack}>
  <BackArrowIcon color="#333" size={24} />
</TouchableOpacity>
```

## API 文档

### IIconProps

```typescript
interface IIconProps {
  color?: string;   // 图标颜色，默认值因图标而异
  size?: number;    // 图标大小，默认 24
}
```

## 最佳实践

1. **统一使用**：在项目中统一使用这些图标，保持视觉一致性
2. **主题适配**：根据主题动态设置图标颜色
3. **尺寸规范**：遵循设计规范设置图标大小（通常为 24px）

## 常见问题

### Q: 如何添加新的图标？

A: 在 `src/components/SvgIcons/index.tsx` 文件中添加新的图标组件，参考现有图标的实现方式。

### Q: 图标颜色如何适配主题？

A: 使用主题系统的颜色，例如：`<BackArrowIcon color={theme.colors.primary} />`。

### Q: 图标大小有规范吗？

A: 建议遵循设计规范，通常导航栏图标为 24px，列表项图标为 20px。

