# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# ============================================
# React Native 基础规则 (0.82+)
# ============================================
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

# React Native 核心类
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.** { *; }
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

# React Native Context 和 Module
-keepclassmembers class * extends com.facebook.react.bridge.ReactContextBaseJavaModule {
    public <init>(...);
}
-keepclassmembers class * extends com.facebook.react.uimanager.ViewManager {
    public <init>(...);
}
-keepclassmembers class * extends com.facebook.react.uimanager.SimpleViewManager {
    public <init>(...);
}
-keepclassmembers class * extends com.facebook.react.uimanager.BaseViewManager {
    public <init>(...);
}

# ============================================
# React Native 新架构 (Fabric + TurboModules)
# ============================================
# TurboModules
-keep class com.facebook.react.turbomodule.** { *; }
-keep interface com.facebook.react.turbomodule.** { *; }

# Fabric (新架构 UI 系统)
-keep class com.facebook.react.fabric.** { *; }
-keep interface com.facebook.react.fabric.** { *; }

# JSI (JavaScript Interface) - 新架构核心
-keep class com.facebook.jni.** { *; }
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}

# React Native 0.82+ 新的包结构
-keep class com.facebook.react.runtime.** { *; }
-keep class com.facebook.react.devsupport.** { *; }
-dontwarn com.facebook.react.devsupport.**

# ============================================
# Hermes 引擎
# ============================================
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# ============================================
# 项目自定义类
# ============================================
-keep class com.storeverserepoapp.** { *; }
-keepclassmembers class com.storeverserepoapp.** { *; }

# ============================================
# react-navigation 规则
# ============================================
-keep class com.swmansion.rnscreens.** { *; }
-dontwarn com.swmansion.rnscreens.**
-keep class com.th3rdwave.safeareacontext.** { *; }
-dontwarn com.th3rdwave.safeareacontext.**

# ============================================
# react-native-gesture-handler 规则
# ============================================
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.**

# ============================================
# react-native-svg 规则
# ============================================
-keep class com.horcrux.svg.** { *; }
-dontwarn com.horcrux.svg.**

# ============================================
# react-native-vector-icons 规则
# ============================================
-keep class com.oblador.vectoricons.** { *; }
-dontwarn com.oblador.vectoricons.**

# ============================================
# react-native-permissions 规则
# ============================================
-keep class com.zoontek.rnpermissions.** { *; }
-dontwarn com.zoontek.rnpermissions.**

# ============================================
# react-native-webview 规则
# ============================================
-keep class com.reactnativecommunity.webview.** { *; }
-dontwarn com.reactnativecommunity.webview.**

# ============================================
# react-native-worklets 规则
# ============================================
-keep class com.worklets.** { *; }
-dontwarn com.worklets.**

# ============================================
# react-native-config 规则
# ============================================
-keep class com.lugg.ReactNativeConfig.** { *; }
-dontwarn com.lugg.ReactNativeConfig.**

# ============================================
# @react-native-async-storage/async-storage 规则
# ============================================
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-dontwarn com.reactnativecommunity.asyncstorage.**

# ============================================
# @react-native-community/netinfo 规则
# ============================================
-keep class com.reactnativecommunity.netinfo.** { *; }
-dontwarn com.reactnativecommunity.netinfo.**

# ============================================
# react-native-get-random-values 规则
# ============================================
-keep class org.getrandomvalues.** { *; }
-dontwarn org.getrandomvalues.**

# ============================================
# react-native-camera-kit 规则
# ============================================
-keep class com.wix.RNCameraKit.** { *; }
-dontwarn com.wix.RNCameraKit.**

# ============================================
# react-native-vision-camera 规则
# ============================================
-keep class com.mrousavy.camera.** { *; }
-keep class com.mrousavy.** { *; }
-dontwarn com.mrousavy.**

# ============================================
# react-native-linear-gradient 规则
# ============================================
-keep class com.BV.LinearGradient.** { *; }
-dontwarn com.BV.LinearGradient.**

# ============================================
# 通用规则
# ============================================
# 保留 JavaScript 接口
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# 保留原生方法
-keepclasseswithmembernames class * {
    native <methods>;
}

# 保留枚举
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# 保留 Parcelable 实现类
-keep class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}

# 保留 Serializable 类
-keepnames class * implements java.io.Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# 保留注解和元数据
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes Exceptions
-keepattributes SourceFile,LineNumberTable
-keepattributes RuntimeVisibleAnnotations,RuntimeVisibleParameterAnnotations

# ============================================
# OkHttp (网络请求库，React Native 内部使用)
# ============================================
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# ============================================
# 移除日志（可选，减小 APK 大小）
# ============================================
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
