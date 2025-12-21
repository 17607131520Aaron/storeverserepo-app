import mineRoutes from './min-router';

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { ComponentType } from 'react';
import type { INavigationBarOptions } from '~/components/NavigationBar';

export interface IRouteConfig {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
  /** 是否为 Tab 首页（不注册到 Root Stack） */
  isTabHome?: boolean;
  /** 是否使用安全区域包裹（默认 true） */
  useSafeArea?: boolean;
  /** 导航栏初始配置（可选，页面也可以通过 props.navBar 动态设置） */
  navBarOptions?: INavigationBarOptions;
}

export const allRoutes: IRouteConfig[] = [...mineRoutes];
