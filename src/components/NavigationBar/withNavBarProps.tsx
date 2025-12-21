/**
 * withNavBarProps 高阶组件
 * 为页面组件自动注入 navBar prop，让页面可以直接通过 props.navBar 控制导航栏
 */

import React from 'react';
import {
  useNavigationBar,
  type INavigationBarOptions,
  type IUseNavigationBarReturn,
} from './useNavigationBar';

import type { ComponentType } from 'react';

/**
 * 注入给页面组件的导航栏控制 prop
 */
export interface INavBarProps {
  /** 导航栏控制对象 */
  navBar: IUseNavigationBarReturn;
}

/**
 * withNavBarProps 高阶组件
 * 自动为页面组件注入 navBar prop
 *
 * @example
 * // 页面组件使用方式
 * interface MyPageProps {
 *   // 其他 props...
 * }
 *
 * const MyPage: React.FC<MyPageProps & INavBarProps> = ({ navBar }) => {
 *   useEffect(() => {
 *     navBar.setTitle('我的页面');
 *     navBar.setRightButtons([
 *       { key: 'save', text: '保存', onPress: handleSave }
 *     ]);
 *   }, []);
 *
 *   return <View>...</View>;
 * };
 *
 * export default MyPage;
 */
export function withNavBarProps<P extends object>(
  WrappedComponent: ComponentType<P & INavBarProps>,
  initialNavBarOptions?: INavigationBarOptions,
): React.FC<P> {
  const WithNavBarPropsComponent: React.FC<P> = (props) => {
    // 使用 useNavigationBar Hook 创建导航栏控制对象
    const navBar = useNavigationBar(initialNavBarOptions);

    // 将 navBar 注入到页面组件的 props 中
    return <WrappedComponent {...props} navBar={navBar} />;
  };

  WithNavBarPropsComponent.displayName = `withNavBarProps(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return WithNavBarPropsComponent;
}
