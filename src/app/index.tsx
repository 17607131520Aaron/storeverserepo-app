import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from '~/components/ErrorBoundary';
import { NavigationBar } from '~/components/NavigationBar';
import { SafeAreaWrapper } from '~/components/SafeAreaWrapper';
import { allRoutes } from '~/routers';
import MainTabsScreen from './MainTabs';

import type { ComponentType } from 'react';

import { ThemeProvider } from '~/theme';

/**
 * 根据配置为组件添加安全区域包裹
 * 注意: 当页面有 header 时,不应包含 top 边缘,因为 NavigationBar 已经处理了顶部安全区域
 */
const withSafeArea = (
  Component: ComponentType<any>,
  useSafeArea: boolean = true,
  hasHeader: boolean = true,
): ComponentType<any> => {
  if (!useSafeArea) {
    return Component;
  }

  // 如果有 header,排除 top 边缘,避免与 NavigationBar 的安全区域处理冲突
  const edges = hasHeader ? ['bottom'] : ['top', 'bottom'];

  return (props: any) => (
    <SafeAreaWrapper edges={edges as any}>
      <Component {...props} />
    </SafeAreaWrapper>
  );
};

const RootStack = createNativeStackNavigator();

const AppContent = (): React.JSX.Element => {
  //   const [isReady, setIsReady] = useState(false);
  //   // 显示启动屏
  //   if (!isReady) {
  //     return <SplashScreen appName="仓储管理" subtitle="智能仓储解决方案" />;
  //   }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right',
          header: ({ options }) => (
            <NavigationBar
              showBack
              showBorder={false}
              title={typeof options.title === 'string' ? options.title : undefined}
            />
          ),
        }}
      >
        <RootStack.Screen
          component={withSafeArea(MainTabsScreen, true, false)}
          name='MainTabs'
          options={{ headerShown: false }}
        />
        {allRoutes.map((route) => {
          const hasHeader = route.options?.headerShown !== false;
          const WrappedComponent = withSafeArea(
            route.component,
            route.useSafeArea ?? true,
            hasHeader,
          );

          // 为每个路由明确设置 header
          const routeOptions = {
            ...route.options,
            header: hasHeader
              ? ({ options }: any) => (
                  <NavigationBar
                    showBack
                    showBorder={false}
                    title={typeof options.title === 'string' ? options.title : null}
                  />
                )
              : undefined,
          };

          return (
            <RootStack.Screen
              key={route.name}
              component={WrappedComponent}
              name={route.name}
              options={routeOptions}
            />
          );
        })}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
