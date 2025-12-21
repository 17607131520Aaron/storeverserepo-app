# 仓库管理系统 (Storeverse Repo App)

一个基于 React Native 开发的智能仓储管理移动应用，专注于提供高效的扫码入库、物料管理等仓储操作功能。

## 📱 项目简介

本项目是一个面向仓储管理的移动端应用，提供了完整的扫码功能、物料管理、用户权限管理等功能模块。支持 Android 和 iOS 双平台运行，采用现代化的技术栈构建，具有良好的用户体验和扩展性。

## ✨ 主要功能

- **扫码功能**
  - 支持二维码和条码扫描
  - 扫码入库管理
  - 扫描历史记录
  - 闪光灯、声音、震动等扫描设置

- **用户系统**
  - 用户登录认证
  - 基于角色的权限管理
  - 个人信息管理

- **导航系统**
  - 自定义导航栏组件
  - 底部标签导航
  - 堆栈式页面导航
  - 支持搜索框、多按钮等自定义配置

- **主题系统**
  - 支持明暗主题切换
  - 自定义主题颜色
  - 响应式布局适配

- **状态管理**
  - 基于 Zustand 的状态管理
  - 数据持久化存储
  - 业务模块化 Store

## 🛠 技术栈

- **框架**: React Native 0.82.1
- **语言**: TypeScript
- **导航**: React Navigation (Bottom Tabs + Stack Navigator)
- **状态管理**: Zustand 5.0.9
- **扫码**: react-native-vision-camera, react-native-camera-kit
- **UI 组件**:
  - react-native-safe-area-context
  - react-native-svg
  - react-native-vector-icons
- **工具库**:
  - axios (网络请求)
  - dayjs (时间处理)
  - lodash (工具函数)

## 📦 项目结构

```
src/
├── app/              # 应用入口和路由配置
├── assets/           # 静态资源
├── components/       # 公共组件
│   ├── ErrorBoundary/    # 错误边界
│   ├── NavigationBar/    # 导航栏组件
│   ├── SafeAreaWrapper/  # 安全区域包装器
│   ├── ScanCode/         # 扫码组件
│   ├── SplashScreen/     # 启动屏
│   └── SvgIcons/         # SVG 图标
├── config/           # 配置文件
├── hooks/            # 自定义 Hooks
├── pages/            # 页面组件
│   ├── About/        # 关于页面
│   ├── Home/         # 首页
│   ├── Login/        # 登录页面
│   ├── Mine/         # 个人中心
│   └── ScanExample/  # 扫码示例页面
├── routers/          # 路由配置
├── store/            # 状态管理
│   ├── business/     # 业务 Store
│   ├── common/       # 公共 Store
│   └── core/         # Store 核心逻辑
├── theme/            # 主题配置
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20
- React Native 开发环境（请参考 [React Native 环境设置指南](https://reactnative.dev/docs/set-up-your-environment)）

### 安装依赖

```sh
# 使用 Yarn（推荐）
yarn install

# 或使用 npm
npm install
```

### 运行项目

#### Step 1: 启动 Metro 服务器

首先需要启动 **Metro**，这是 React Native 的 JavaScript 打包工具。

在项目根目录运行以下命令启动 Metro 开发服务器：

```sh
# 使用 npm
npm start

# 或使用 Yarn
yarn start
```

#### Step 2: 构建并运行应用

Metro 运行后，在项目根目录打开新的终端窗口，使用以下命令构建并运行 Android 或 iOS 应用：

**Android:**

```sh
# 使用 npm
npm run android

# 或使用 Yarn
yarn android
```

**iOS:**

对于 iOS，需要先安装 CocoaPods 依赖（首次克隆项目或更新原生依赖后需要运行）。

首次创建项目时，运行 Ruby bundler 安装 CocoaPods：

```sh
bundle install
```

然后，每次更新原生依赖后，运行：

```sh
bundle exec pod install
```

更多信息请参考 [CocoaPods 入门指南](https://guides.cocoapods.org/using/getting-started.html)。

```sh
# 使用 npm
npm run ios

# 或使用 Yarn
yarn ios
```

如果一切配置正确，您应该能看到应用在 Android 模拟器、iOS 模拟器或连接的设备上运行。

您也可以直接在 Android Studio 或 Xcode 中构建和运行应用。

#### 开发提示

- 修改代码后，应用会自动更新（Fast Refresh）
- 强制重载：Android 按两次 <kbd>R</kbd> 键或从开发者菜单选择"Reload"（<kbd>Ctrl</kbd> + <kbd>M</kbd> / <kbd>Cmd ⌘</kbd> + <kbd>M</kbd>）
- iOS 模拟器：按 <kbd>R</kbd> 键重载

## 📚 更多信息

- 查看 [组件文档](./docs/components/README.md) 了解项目组件使用说明
- 查看 [React Native 官方文档](https://reactnative.dev/docs/getting-started) 了解更多 React Native 知识
- 如需将代码集成到现有应用，请参考 [集成指南](https://reactnative.dev/docs/integration-with-existing-apps)

## 🐛 故障排查

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## 🔗 相关资源

了解更多 React Native 相关内容，请参考以下资源：

- [React Native 官网](https://reactnative.dev) - 了解更多 React Native 信息
- [环境设置指南](https://reactnative.dev/docs/environment-setup) - React Native 环境配置概览
- [入门教程](https://reactnative.dev/docs/getting-started) - React Native 基础知识导览
- [官方博客](https://reactnative.dev/blog) - 阅读最新的 React Native 博客文章
- [GitHub 仓库](https://github.com/facebook/react-native) - React Native 开源代码仓库
