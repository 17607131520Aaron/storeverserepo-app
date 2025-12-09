import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>首页</Text>
      <Text style={styles.subtitle}>欢迎使用仓储管理系统</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomePage;
