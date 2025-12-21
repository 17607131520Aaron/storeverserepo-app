import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Root Stack 参数列表
 * 定义所有路由及其参数类型
 */
export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Home: undefined;
  ScanExample: undefined;
  MineHome: undefined;
  About: undefined;
};

/**
 * Root Stack 导航类型
 */
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// 声明全局类型，让 React Navigation 知道我们的路由类型
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
