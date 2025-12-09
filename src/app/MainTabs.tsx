import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { getTabsByRole } from '~/app/tabConfig';
// import { NavigationBar } from '~/components/NavigationBar';
import { useUserStore } from '~/store';

const Tab = createBottomTabNavigator();

const MainTabs = (): React.JSX.Element => {
  const { role } = useUserStore();
  const tabs = getTabsByRole(role);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          component={tab.component}
          name={tab.name}
          options={{
            title: tab.label, // 使用 label 作为标题
            tabBarLabel: tab.label,
            tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>{tab.icon}</Text>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
});

export default MainTabs;
