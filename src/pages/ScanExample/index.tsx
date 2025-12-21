import React, { useState } from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import styles from './index.style';

interface ScanCodeItem {
  id: number;
  value: string;
}

const SNScannerScreen: React.FC = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const totalCount: number = 98;

  const handleComplete = () => {
    console.log('录入完成');
  };

  const sncodeList = scannedCodes.map((item, index) => ({ id: index + 1, value: item }));

  const renderItem: ListRenderItem<ScanCodeItem> = ({ item }) => (
    <View>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}></View>
      <Text style={styles.scanInstruction}>请扫描物料编码/串码SN~</Text>
      <View style={styles.itemCard}>
        <View style={styles.itemImagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>🖼️</Text>
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.itemDetails}>
            <View style={styles.itemTopRow}>
              <Text style={styles.itemName} numberOfLines={2}>
                售后后壳组件-小米9-深灰色
              </Text>
            </View>
          </View>
          <View style={styles.itemBottomRow}>
            <Text style={styles.itemInfo}>56000100F100 | ¥1,150.00</Text>
            <Text style={styles.itemQuantity}>x 98</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusBanner}>
        <Text style={styles.statusIcon}>ⓘ</Text>
        <Text style={styles.statusText}>
          请补录SN ({scannedCodes.length}/{totalCount})
        </Text>
      </View>
      <FlatList
        data={sncodeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    </View>
  );
};

export default SNScannerScreen;
