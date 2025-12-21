# NavigationBar - 导航栏组件

## 概述

`NavigationBar` 是一个功能丰富的自定义导航栏组件，支持返回按钮、标题、右侧多按钮、搜索框等功能，提供了三种使用方式：直接使用组件、使用 Hook、使用 HOC。

## 使用场景

- ✅ **标准页面导航**：需要返回按钮和标题的页面
- ✅ **动态导航栏**：需要根据页面状态动态更新标题或按钮
- ✅ **搜索页面**：需要在导航栏中集成搜索框
- ✅ **多操作页面**：需要在导航栏右侧添加多个操作按钮

## 何时选择哪种方式

### 1. 直接使用 NavigationBar 组件

**适用场景**：
- 在路由配置中统一设置导航栏
- 导航栏配置相对固定，不需要动态更新
- 使用 React Navigation 的 `header` 选项

**示例**：
```typescript
// 在路由配置中使用
<Stack.Screen
  name="Detail"
  component={DetailPage}
  options={{
    header: ({ options }) => (
      <NavigationBar
        title={options.title}
        showBack
        rightButtons={[
          { key: 'save', text: '保存', onPress: handleSave }
        ]}
      />
    ),
  }}
/>
```

### 2. 使用 useNavigationBar Hook

**适用场景**：
- 需要在页面组件中动态控制导航栏
- 导航栏配置需要根据页面状态变化
- 不想使用 HOC 包装组件

**示例**：
```typescript
import { useNavigationBar } from '~/components/NavigationBar';
import { NavigationBar } from '~/components/NavigationBar';

const MyPage: React.FC = () => {
  const { navBarProps, setTitle, setRightButtons } = useNavigationBar({
    title: '初始标题',
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTitle(`已选择 ${count} 项`);
    setRightButtons([
      { key: 'clear', text: '清空', onPress: () => setCount(0) }
    ]);
  }, [count]);

  return (
    <View>
      <NavigationBar {...navBarProps} />
      {/* 页面内容 */}
    </View>
  );
};
```

### 3. 使用 withNavigationBar HOC

**适用场景**：
- 希望自动添加导航栏，无需手动渲染
- 需要完整的导航栏控制能力
- 需要自定义导航栏组件

**示例**：
```typescript
import { withNavigationBar } from '~/components/NavigationBar';

const MyPage: React.FC<IWithNavigationBarProps> = ({ navBar }) => {
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    navBar.setTitle(`已选择 ${selectedCount} 项`);
    navBar.setRightButtons([
      { key: 'save', text: '保存', onPress: handleSave }
    ]);
  }, [selectedCount]);

  return <View>{/* 页面内容 */}</View>;
};

export default withNavigationBar(MyPage, { title: '我的页面' });
```

## API 文档

### NavigationBar Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 标题文字 |
| `titleComponent` | `ReactNode` | - | 自定义标题组件（优先级高于 title） |
| `showBack` | `boolean` | `true` | 是否显示返回按钮 |
| `backIcon` | `ReactNode` | - | 自定义返回按钮图标 |
| `onBack` | `() => void` | - | 返回按钮点击回调（默认调用 navigation.goBack） |
| `rightButtons` | `INavBarButton[]` | - | 右侧按钮列表 |
| `rightComponent` | `ReactNode` | - | 右侧自定义组件（优先级高于 rightButtons） |
| `searchConfig` | `INavBarSearchConfig` | - | 搜索框配置（显示在标题位置） |
| `backgroundColor` | `string` | - | 背景颜色 |
| `titleColor` | `string` | - | 标题颜色 |
| `tintColor` | `string` | - | 图标/按钮颜色 |
| `showBorder` | `boolean` | `true` | 是否显示底部分割线 |
| `transparent` | `boolean` | `false` | 是否透明背景 |
| `statusBarStyle` | `'light' \| 'dark'` | - | 状态栏样式 |

### INavBarButton

```typescript
interface INavBarButton {
  key: string;              // 按钮唯一标识
  icon?: ReactNode;         // 按钮图标
  text?: string;            // 按钮文字
  onPress: () => void;      // 点击回调
  disabled?: boolean;       // 是否禁用
  style?: ViewStyle;        // 自定义样式
  textStyle?: TextStyle;    // 文字样式
}
```

### INavBarSearchConfig

```typescript
interface INavBarSearchConfig {
  placeholder?: string;           // 占位文字
  value?: string;                 // 搜索值
  onChangeText?: (text: string) => void;  // 值变化回调
  onSubmit?: (text: string) => void;        // 提交回调
  style?: ViewStyle;              // 自定义样式
  autoFocus?: boolean;            // 是否自动聚焦
}
```

## 使用示例

### 1. 基础导航栏

```typescript
<NavigationBar
  title="商品详情"
  showBack
  rightButtons={[
    { key: 'share', icon: <ShareIcon />, onPress: handleShare }
  ]}
/>
```

### 2. 带搜索框的导航栏

```typescript
<NavigationBar
  showBack
  searchConfig={{
    placeholder: '搜索商品',
    value: searchText,
    onChangeText: setSearchText,
    onSubmit: handleSearch,
    autoFocus: true,
  }}
/>
```

### 3. 动态更新导航栏（使用 Hook）

```typescript
const { navBarProps, setTitle, setRightButtons } = useNavigationBar();

useEffect(() => {
  if (isEditing) {
    setTitle('编辑模式');
    setRightButtons([
      { key: 'cancel', text: '取消', onPress: handleCancel },
      { key: 'save', text: '保存', onPress: handleSave }
    ]);
  } else {
    setTitle('查看模式');
    setRightButtons([
      { key: 'edit', text: '编辑', onPress: handleEdit }
    ]);
  }
}, [isEditing]);
```

### 4. 自定义导航栏（使用 HOC）

```typescript
const MyPage: React.FC<IWithNavigationBarProps> = ({ navBar }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    navBar.setCustomHeader(
      <View style={styles.customHeader}>
        <Text>已选择 {count} 项</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text>保存</Text>
        </TouchableOpacity>
      </View>
    );
  }, [count]);

  return <View>{/* 页面内容 */}</View>;
};

export default withNavigationBar(MyPage);
```

## 最佳实践

1. **统一使用方式**：在项目中统一选择一种使用方式（推荐使用 HOC）
2. **性能优化**：避免在渲染函数中频繁更新导航栏配置
3. **主题适配**：导航栏会自动适配主题，无需手动设置颜色
4. **安全区域**：导航栏已自动处理顶部安全区域，无需额外处理

## 常见问题

### Q: NavigationBar 如何与 React Navigation 集成？

A: 在路由配置的 `header` 选项中返回 `NavigationBar` 组件即可。

### Q: 如何动态更新导航栏标题？

A: 使用 `useNavigationBar` Hook 或 `withNavigationBar` HOC，调用 `setTitle` 方法。

### Q: 如何自定义返回按钮的行为？

A: 传入 `onBack` prop 或使用 HOC 的 `navBar.setOnBack` 方法。

