import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { ScanCode, type IScanCodeRef, type IBarCodeReadResult } from '~/components/ScanCode';
import type { INavBarProps } from '~/components/NavigationBar';
import styles from './index.style';

interface ScanCodeItem {
  id: number;
  value: string;
}

const SNScannerScreen: React.FC<INavBarProps> = ({ navBar }) => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const scanCodeRef = useRef<IScanCodeRef>(null);
  const totalCount: number = 98;

  // 初始化导航栏：标题左对齐
  useEffect(() => {
    navBar.setTitleStyle({ textAlign: 'left' });
  }, []);

  // 当扫描数量变化时，更新导航栏标题和右侧按钮
  useEffect(() => {
    navBar.setTitle(`扫码入库 (${scannedCodes.length}/${totalCount})`);
    navBar.setRightButtons([
      {
        key: 'manual',
        text: '手动录入',
        onPress: () => {
          // TODO: 实现手动录入功能
          console.log('手动录入');
        },
        textStyle: { color: '#007AFF' },
      },
      {
        key: 'flashlight',
        text: '手电筒',
        onPress: () => {
          setFlashlightOn((prev) => !prev);
        },
        textStyle: { color: '#007AFF' },
      },
    ]);
  }, [scannedCodes.length, totalCount, navBar]);

  const handleComplete = () => {
    console.log('录入完成', scannedCodes);
  };

  const handleBarCodeRead = (result: IBarCodeReadResult) => {
    const code = result.data;
    // 避免重复添加相同的码
    if (!scannedCodes.includes(code)) {
      setScannedCodes((prev) => [...prev, code]);
    }
  };

  const sncodeList = scannedCodes.map((item, index) => ({ id: index + 1, value: item }));

  const renderItem: ListRenderItem<ScanCodeItem> = ({ item }) => (
    <View>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScanCode
        ref={scanCodeRef}
        defaultCanScan={true}
        vibrate={true}
        beep={true}
        needAnim={true}
        flashlight={flashlightOn}
        onBarCodeRead={handleBarCodeRead}
        style={styles.scannerContainer}
      />
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
