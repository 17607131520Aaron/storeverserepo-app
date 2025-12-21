import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { showSuccess, showWarning } from '~/utils/toast';

const SNScannerScreen: React.FC = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const totalCount = 98; // 总数量

  /**
   * 全部扫描完成
   */
  const handleComplete = () => {
    if (scannedCodes.length === 0) {
      showWarning('请先扫描至少一个码');
      return;
    }
    console.log('扫描完成，共扫描:', scannedCodes.length, '个码');
    showSuccess(`扫描完成，共 ${scannedCodes.length} 个码`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />

      {/* --- 扫描组件区域 --- */}
      <View style={styles.scannerContainer}></View>
      <Text style={styles.scanInstruction}>请扫描物料编码/串码SN~</Text>

      {/* --- 物料信息 --- */}
      <View style={styles.itemCard}>
        <View style={styles.itemImagePlaceholder}>
          {/* 这是一个图像占位符 */}
          <Text style={styles.imagePlaceholderText}>🖼️</Text>
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.itemTopRow}>
            <Text style={styles.itemName} numberOfLines={2}>
              售后后壳组件-小米9-深灰色
            </Text>
            <Text style={styles.itemQuantity}>x 98</Text>
          </View>
          <Text style={styles.itemInfo}>56000100F100 | ¥1,150.00</Text>
        </View>
      </View>

      {/* --- 扫描状态提示 --- */}
      <View style={styles.statusBanner}>
        <Text style={styles.statusIcon}>ⓘ</Text>
        <Text style={styles.statusText}>
          请补录SN ({scannedCodes.length}/{totalCount})
        </Text>
      </View>

      {/* --- 底部扫描完成按钮 --- */}
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[styles.footerButton, scannedCodes.length > 0 && styles.footerButtonActive]}
        onPress={handleComplete}
      >
        <Text
          style={[
            styles.footerButtonText,
            scannedCodes.length > 0 && styles.footerButtonTextActive,
          ]}
        >
          全部扫描完成
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // 页头样式
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerIcon: {
    padding: 5,
  },
  headerBackText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    // 确保标题在没有右侧按钮时也能居中
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionText: {
    fontSize: 16,
    color: '#007AFF', // 蓝色链接文字
  },
  // 扫描区域样式
  scannerContainer: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  scanner: {
    flex: 1,
  },
  scanFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -80,
    marginLeft: -80,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanCorner: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  scanInstruction: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  // 物料卡片样式
  itemCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagePlaceholderText: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
  },
  itemInfo: {
    fontSize: 14,
    color: '#888888',
    marginTop: 8,
  },
  // 状态提示样式
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2FF', // 淡蓝色背景
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  statusIcon: {
    color: '#007AFF',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: '#007AFF',
  },
  // 底部按钮样式
  footerButton: {
    backgroundColor: '#E0E0E0', // 灰色背景
    paddingVertical: 15,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonActive: {
    backgroundColor: '#007AFF', // 激活状态蓝色背景
  },
  footerButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  footerButtonTextActive: {
    color: '#FFFFFF', // 激活状态白色文字
  },
});

export default SNScannerScreen;
