# React Native 原生配置文档

## 📋 概述

本文档记录了项目中 React Native 原生层的配置，包括权限配置、镜像源配置、APK 分包配置等。

---

## 🔐 权限配置

### Android 权限 (AndroidManifest.xml)

| 权限名称                 | 用途说明                          |
| ------------------------ | --------------------------------- |
| `INTERNET`               | 网络访问                          |
| `CAMERA`                 | 相机访问（扫码、拍照）            |
| `RECORD_AUDIO`           | 麦克风访问（视频录制）            |
| `READ_EXTERNAL_STORAGE`  | 读取外部存储（Android 12 及以下） |
| `WRITE_EXTERNAL_STORAGE` | 写入外部存储（Android 12 及以下） |
| `READ_MEDIA_IMAGES`      | 读取媒体图片（Android 13+）       |
| `READ_MEDIA_VIDEO`       | 读取媒体视频（Android 13+）       |
| `VIBRATE`                | 手机震动                          |

**硬件特性声明：**

| 特性                                | 说明               |
| ----------------------------------- | ------------------ |
| `android.hardware.camera`           | 相机硬件（非必需） |
| `android.hardware.camera.autofocus` | 自动对焦（非必需） |

### iOS 权限 (Info.plist)

| 权限 Key                            | 描述文案                         |
| ----------------------------------- | -------------------------------- |
| `NSCameraUsageDescription`          | 需要访问相机以进行扫码和拍照功能 |
| `NSMicrophoneUsageDescription`      | 需要访问麦克风以进行视频录制功能 |
| `NSPhotoLibraryUsageDescription`    | 需要访问相册以保存和选择照片     |
| `NSPhotoLibraryAddUsageDescription` | 需要访问相册以保存照片           |

### iOS Podfile 权限处理器

```ruby
setup_permissions([
  'Camera',
  'Microphone',
  'PhotoLibrary',
  'PhotoLibraryAddOnly',
])
```

---

## 🪞 Android 镜像源配置

### 配置位置

`android/build.gradle`

### 镜像源列表

```gradle
repositories {
    // 阿里云镜像源（优先使用）
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/public' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    // 官方源（备用）
    google()
    mavenCentral()
}
```

### 说明

- 阿里云镜像源放在官方源之前，优先从国内镜像下载依赖
- 显著提升国内网络环境下的依赖下载速度
- `buildscript` 和 `allprojects` 都需要配置

---

## 📦 APK 分包配置

### 配置位置

`android/app/build.gradle`

### ABI 分包配置

```gradle
splits {
    abi {
        reset()
        enable true
        universalApk true  // 同时生成包含所有架构的通用包
        include "armeabi-v7a", "arm64-v8a"  // 只包含常用架构
    }
}
```

### 版本号策略

```gradle
project.ext.versionCodes = [
    'armeabi-v7a': 1,
    'arm64-v8a': 2,
    'x86': 3,
    'x86_64': 4
]
```

**版本号计算公式：** `ABI版本码 * 1000000 + 应用版本码`

### 生成的 APK 文件

| APK 类型                      | 适用设备              | 体积 |
| ----------------------------- | --------------------- | ---- |
| `app-armeabi-v7a-release.apk` | 32位 ARM 设备         | 较小 |
| `app-arm64-v8a-release.apk`   | 64位 ARM 设备（主流） | 较小 |
| `app-universal-release.apk`   | 所有设备              | 较大 |

### 优势

- 单个 APK 体积减小约 50%
- 用户下载更快，安装包更小
- 通用包作为兜底方案

---

## ⚙️ 构建配置

### SDK 版本 (android/build.gradle)

| 配置项              | 版本             |
| ------------------- | ---------------- |
| `buildToolsVersion` | 36.0.0           |
| `minSdkVersion`     | 24 (Android 7.0) |
| `compileSdkVersion` | 36               |
| `targetSdkVersion`  | 36               |
| `ndkVersion`        | 27.1.12297006    |
| `kotlinVersion`     | 2.1.20           |

### Gradle 配置 (android/gradle.properties)

| 配置项                     | 值                                    | 说明             |
| -------------------------- | ------------------------------------- | ---------------- |
| `org.gradle.jvmargs`       | `-Xmx2048m -XX:MaxMetaspaceSize=512m` | JVM 内存配置     |
| `reactNativeArchitectures` | `armeabi-v7a,arm64-v8a`               | 构建架构         |
| `newArchEnabled`           | `true`                                | 启用新架构       |
| `hermesEnabled`            | `true`                                | 启用 Hermes 引擎 |

### Release 构建优化

```gradle
buildTypes {
    release {
        minifyEnabled true           // 代码混淆
        shrinkResources true         // 移除未使用资源
        proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
    }
}
```

---

## 🔑 签名配置

### 配置文件

`android/keystore.properties`（不提交到 Git）

### 配置格式

```properties
storeFile=your-release-key.keystore
storePassword=your-store-password
keyAlias=your-key-alias
keyPassword=your-key-password
```

### 使用方式

构建系统会自动读取 `keystore.properties` 文件进行签名，如果文件不存在则使用 debug 签名。

---

## 🛠️ 常用命令

### iOS

```bash
# 安装 Pod 依赖
cd ios && pod install && cd ..

# 清理构建缓存
cd ios && rm -rf build Pods Podfile.lock && pod install && cd ..
```

### Android

```bash
# 清理构建缓存
cd android && ./gradlew clean && cd ..

# 构建 Release APK
cd android && ./gradlew assembleRelease && cd ..
```

---

## 📱 相关插件

| 插件名称                     | 版本    | 用途       |
| ---------------------------- | ------- | ---------- |
| `react-native-vision-camera` | ^4.7.3  | 高性能相机 |
| `react-native-camera-kit`    | ^16.1.3 | 相机工具包 |
| `react-native-permissions`   | ^5.4.4  | 权限管理   |

---

## 📝 更新记录

| 日期       | 更新内容                                     |
| ---------- | -------------------------------------------- |
| 2025-12-09 | 初始化文档，配置相机、麦克风、相册、震动权限 |
