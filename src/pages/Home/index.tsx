import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScanCard from './ScanCard';
import { useTheme } from '~/theme';
import type { RootStackNavigationProp } from '~/types/navigation';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleScanPress = () => {
    navigation.navigate('ScanExample');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          paddingTop: insets.top + theme.spacing.md,
        },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 页面标题区域 */}
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.colors.text }]}>欢迎回来</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            快速开始您的工作
          </Text>
        </View>

        {/* 扫码卡片 */}
        <ScanCard onScanPress={handleScanPress} style={styles.scanCard} />

        {/* 占位区域 - 可以后续添加其他功能 */}
        <View style={styles.placeholderArea} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  scanCard: {
    marginBottom: 24,
  },
  placeholderArea: {
    flex: 1,
    minHeight: 200,
  },
});

export default HomePage;
