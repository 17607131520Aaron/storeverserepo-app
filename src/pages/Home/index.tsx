import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScanIcon } from '~/components/SvgIcons';
import { useTheme } from '~/theme';

import type { RootStackNavigationProp } from '~/types/navigation';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleScanPress = () => {
    navigation.navigate('ScanExample');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>首页</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        欢迎使用仓储管理系统
      </Text>

      {/* 扫码入库卡片 */}
      <View style={[styles.scanCard, { backgroundColor: theme.colors.background }]}>
        <View style={styles.scanCardContent}>
          <View style={styles.scanCardLeft}>
            <Text style={[styles.scanCardTitle, { color: theme.colors.text }]}>扫码入库</Text>
            <Text style={[styles.scanCardHint, { color: theme.colors.textSecondary }]}>
              请扫描调拨单条码、二维码
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleScanPress}
            style={styles.scanButton}
          >
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={styles.scanButtonGradient}
            >
              <ScanIcon color="#FFFFFF" size={20} />
              <Text style={styles.scanButtonText}>去扫码</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  scanCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
  },
  scanCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanCardLeft: {
    flex: 1,
    marginRight: 16,
  },
  scanCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  scanCardHint: {
    fontSize: 14,
    lineHeight: 20,
  },
  scanButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 120,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomePage;
