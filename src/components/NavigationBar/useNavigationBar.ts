/**
 * useNavigationBar Hook
 * 提供给页面组件动态控制导航栏的能力
 * 与 React Navigation 集成，通过 navigation.setOptions() 设置导航栏配置
 */

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useRef } from 'react';

import type { INavBarButton, INavBarSearchConfig, INavigationBarProps } from './types';

/**
 * 导航栏配置选项
 */
export interface INavigationBarOptions {
  /** 标题 */
  title?: string;
  /** 自定义标题组件 */
  titleComponent?: React.ReactNode;
  /** 是否显示返回按钮 */
  showBack?: boolean;
  /** 自定义返回按钮图标 */
  backIcon?: React.ReactNode;
  /** 返回按钮点击回调 */
  onBack?: () => void;
  /** 右侧按钮 */
  rightButtons?: INavBarButton[];
  /** 右侧自定义组件 */
  rightComponent?: React.ReactNode;
  /** 搜索配置 */
  searchConfig?: INavBarSearchConfig;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 标题颜色 */
  titleColor?: string;
  /** 图标颜色 */
  tintColor?: string;
  /** 是否显示底部边框 */
  showBorder?: boolean;
  /** 是否透明 */
  transparent?: boolean;
  /** 状态栏样式 */
  statusBarStyle?: 'light' | 'dark';
}

/**
 * React Navigation 的扩展选项，用于传递导航栏配置
 */
declare module '@react-navigation/native' {
  export interface ScreenOptionsBase {
    /** 导航栏配置 */
    navBar?: Partial<INavigationBarProps>;
  }
}

/**
 * useNavigationBar 返回值
 */
export interface IUseNavigationBarReturn {
  /** 设置标题 */
  setTitle: (title: string) => void;
  /** 设置自定义标题组件 */
  setTitleComponent: (component: React.ReactNode) => void;
  /** 设置右侧按钮 */
  setRightButtons: (buttons: INavBarButton[]) => void;
  /** 设置右侧自定义组件 */
  setRightComponent: (component: React.ReactNode) => void;
  /** 设置搜索配置 */
  setSearchConfig: (config: INavBarSearchConfig | undefined) => void;
  /** 设置是否显示返回按钮 */
  setShowBack: (show: boolean) => void;
  /** 设置返回按钮图标 */
  setBackIcon: (icon: React.ReactNode) => void;
  /** 设置返回按钮点击回调 */
  setOnBack: (callback: (() => void) | undefined) => void;
  /** 更新导航栏配置 */
  updateNavBar: (options: Partial<INavigationBarOptions>) => void;
  /** 显示/隐藏导航栏 */
  setVisible: (visible: boolean) => void;
  /** 设置背景颜色 */
  setBackgroundColor: (color: string) => void;
  /** 设置标题颜色 */
  setTitleColor: (color: string) => void;
  /** 设置图标颜色 */
  setTintColor: (color: string) => void;
  /** 设置是否显示底部边框 */
  setShowBorder: (show: boolean) => void;
  /** 设置是否透明 */
  setTransparent: (transparent: boolean) => void;
  /** 设置状态栏样式 */
  setStatusBarStyle: (style: 'light' | 'dark') => void;
}

/**
 * useNavigationBar Hook
 * 让页面组件可以动态控制导航栏，通过 React Navigation 的 setOptions 与导航栏集成
 *
 * @example
 * const { setTitle, setRightButtons } = useNavigationBar({
 *   title: '页面标题',
 *   rightButtons: [{ key: 'save', text: '保存', onPress: handleSave }]
 * });
 *
 * // 动态更新标题
 * useEffect(() => {
 *   setTitle(`已选择 ${count} 项`);
 * }, [count]);
 */
export function useNavigationBar(initialOptions?: INavigationBarOptions): IUseNavigationBarReturn {
  const navigation = useNavigation();

  // 使用 ref 保存当前配置，避免重复更新
  const currentOptionsRef = useRef<Partial<INavigationBarProps>>(initialOptions ?? {});

  // 更新导航栏配置的内部方法
  const updateNavBarOptions = useCallback(
    (newOptions: Partial<INavigationBarProps>) => {
      currentOptionsRef.current = { ...currentOptionsRef.current, ...newOptions };
      navigation.setOptions({
        navBar: currentOptionsRef.current,
      });
    },
    [navigation],
  );

  // 初始化导航栏配置
  useLayoutEffect(() => {
    if (initialOptions) {
      currentOptionsRef.current = initialOptions;
      navigation.setOptions({
        navBar: initialOptions,
      });
    }
  }, [navigation, initialOptions]);

  // 设置标题
  const setTitle = useCallback(
    (title: string) => {
      updateNavBarOptions({ title });
    },
    [updateNavBarOptions],
  );

  // 设置自定义标题组件
  const setTitleComponent = useCallback(
    (titleComponent: React.ReactNode) => {
      updateNavBarOptions({ titleComponent });
    },
    [updateNavBarOptions],
  );

  // 设置右侧按钮
  const setRightButtons = useCallback(
    (rightButtons: INavBarButton[]) => {
      updateNavBarOptions({ rightButtons });
    },
    [updateNavBarOptions],
  );

  // 设置右侧自定义组件
  const setRightComponent = useCallback(
    (rightComponent: React.ReactNode) => {
      updateNavBarOptions({ rightComponent });
    },
    [updateNavBarOptions],
  );

  // 设置搜索配置
  const setSearchConfig = useCallback(
    (searchConfig: INavBarSearchConfig | undefined) => {
      updateNavBarOptions({ searchConfig });
    },
    [updateNavBarOptions],
  );

  // 设置是否显示返回按钮
  const setShowBack = useCallback(
    (showBack: boolean) => {
      updateNavBarOptions({ showBack });
    },
    [updateNavBarOptions],
  );

  // 设置返回按钮图标
  const setBackIcon = useCallback(
    (backIcon: React.ReactNode) => {
      updateNavBarOptions({ backIcon });
    },
    [updateNavBarOptions],
  );

  // 设置返回按钮点击回调
  const setOnBack = useCallback(
    (onBack: (() => void) | undefined) => {
      updateNavBarOptions({ onBack });
    },
    [updateNavBarOptions],
  );

  // 更新导航栏配置
  const updateNavBar = useCallback(
    (newOptions: Partial<INavigationBarOptions>) => {
      updateNavBarOptions(newOptions);
    },
    [updateNavBarOptions],
  );

  // 显示/隐藏导航栏
  const setVisible = useCallback(
    (visible: boolean) => {
      navigation.setOptions({
        headerShown: visible,
      });
    },
    [navigation],
  );

  // 设置背景颜色
  const setBackgroundColor = useCallback(
    (backgroundColor: string) => {
      updateNavBarOptions({ backgroundColor });
    },
    [updateNavBarOptions],
  );

  // 设置标题颜色
  const setTitleColor = useCallback(
    (titleColor: string) => {
      updateNavBarOptions({ titleColor });
    },
    [updateNavBarOptions],
  );

  // 设置图标颜色
  const setTintColor = useCallback(
    (tintColor: string) => {
      updateNavBarOptions({ tintColor });
    },
    [updateNavBarOptions],
  );

  // 设置是否显示底部边框
  const setShowBorder = useCallback(
    (showBorder: boolean) => {
      updateNavBarOptions({ showBorder });
    },
    [updateNavBarOptions],
  );

  // 设置是否透明
  const setTransparent = useCallback(
    (transparent: boolean) => {
      updateNavBarOptions({ transparent });
    },
    [updateNavBarOptions],
  );

  // 设置状态栏样式
  const setStatusBarStyle = useCallback(
    (statusBarStyle: 'light' | 'dark') => {
      updateNavBarOptions({ statusBarStyle });
    },
    [updateNavBarOptions],
  );

  return {
    setTitle,
    setTitleComponent,
    setRightButtons,
    setRightComponent,
    setSearchConfig,
    setShowBack,
    setBackIcon,
    setOnBack,
    updateNavBar,
    setVisible,
    setBackgroundColor,
    setTitleColor,
    setTintColor,
    setShowBorder,
    setTransparent,
    setStatusBarStyle,
  };
}
