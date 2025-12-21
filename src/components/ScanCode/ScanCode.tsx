/**
 * 扫码组件
 * 基于 react-native-vision-camera 实现
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, View, Vibration, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, type Code } from 'react-native-vision-camera';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import { usePermission } from '~/hooks/usePermission';
import { showError } from '~/utils/toast';
import {
  DEFAULT_ACCUMULATE_TIME_INTERVAL,
  DEFAULT_SUPPORT_FORMAT_LIST,
  AREA_TOLERANCE,
  CODABAR_PREFIX_SUFFIX_REGEX,
} from './constants';
import type {
  IScanCodeProps,
  IScanResultItem,
  IBarCodeReadResult,
  INativeBarCodeResult,
} from './types';
import { SUPPORT_CODE_TYPE } from './types';

/**
 * 获取相机权限常量
 */
const getCameraPermission = () => {
  if (Platform.OS === 'ios') {
    return PERMISSIONS.IOS.CAMERA;
  }
  return PERMISSIONS.ANDROID.CAMERA;
};

/**
 * 将 vision-camera 的 Code 类型转换为条码类型数字
 */
const convertCodeTypeToNumber = (codeType: string): number => {
  const typeMap: Record<string, number> = {
    qr: 64, // QRCODE
    'ean-13': 13, // EAN13
    'ean-8': 8, // EAN8
    'code-128': 128, // CODE128
    'code-39': 39, // CODE39
    'code-93': 93, // CODE93
    codabar: 38, // CODABAR
    'upc-a': 12, // UPCA
    'upc-e': 9, // UPCE
    'pdf-417': 57, // PDF417
    itf: 25, // I25
    'data-matrix': 0, // 暂不支持，返回 NONE
  };
  return typeMap[codeType.toLowerCase()] ?? 0;
};

/**
 * 处理 CODABAR 格式（去除首尾字母）
 */
const processCodabarCode = (code: string): string => {
  if (CODABAR_PREFIX_SUFFIX_REGEX.test(code) && code.length > 2) {
    return code.slice(1, -1);
  }
  return code;
};

/**
 * 扫码组件
 */
export const ScanCode: React.FC<IScanCodeProps> = ({
  defaultCanScan = true,
  codeFormatList = DEFAULT_SUPPORT_FORMAT_LIST,
  scanArea,
  maskColor = '#99000000',
  needLimitArea = false,
  needAnim = false,
  flashlight = false,
  vibrate = false,
  beep = false,
  fastMode = false,
  resultIncludeRegs = [],
  resultExcludeRegs = [],
  singleScanOutTime,
  accumulateTimeInterval = DEFAULT_ACCUMULATE_TIME_INTERVAL,
  openReportTime = true,
  openEmptyReturnResults = true,
  openAccumulateResult = false,
  onBarCodeRead,
  onBarCodeReadList,
  onBarCodeReadNative,
  onBarCodeReadTimeout,
  onCameraOpenError,
  onCameraError,
  onTransformOriginCodes,
  style,
}) => {
  const [isActive, setIsActive] = useState(defaultCanScan);
  const [scanKey, setScanKey] = useState(0); // 用于重新创建组件实例
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accumulateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accumulateResultsRef = useRef<Map<string, { count: number; item: IScanResultItem }>>(
    new Map(),
  );
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const startTimeRef = useRef<number>(0);
  const retryCountRef = useRef(0);

  // 权限检查
  const cameraPermission = getCameraPermission();
  const { isGranted, requestPermission, isBlocked } = usePermission(cameraPermission, {
    checkOnMount: true,
    onGranted: () => {
      setIsActive(true);
    },
    onDenied: async () => {
      const result = await requestPermission();
      if (result !== RESULTS.GRANTED) {
        setIsActive(false);
      }
    },
    onBlocked: () => {
      setIsActive(false);
      onCameraOpenError?.(new Error('相机权限被永久拒绝，请在设置中开启'));
    },
  });

  // 获取相机设备
  const device = useCameraDevice('back');

  // 处理条码识别结果
  const processScanResult = useCallback(
    (codes: Code[]): IScanResultItem[] => {
      const startTime = Date.now();
      const results: IScanResultItem[] = [];

      codes.forEach((code) => {
        const codeType = convertCodeTypeToNumber(code.type);
        let codeData = code.value ?? '';

        // 应用原始结果转换函数
        if (onTransformOriginCodes) {
          codeData = onTransformOriginCodes(codeData);
        }

        // 处理 CODABAR 格式
        if (codeType === 38) {
          codeData = processCodabarCode(codeData);
        }

        // 检查格式是否支持
        if (
          codeFormatList.length > 0 &&
          !codeFormatList.includes(SUPPORT_CODE_TYPE.NONE) &&
          !codeFormatList.includes(codeType)
        ) {
          return;
        }

        const resultItem: IScanResultItem = {
          data: codeData,
          type: codeType,
          // vision-camera 不提供坐标信息，这里留空
          // 如果需要坐标，需要使用其他库或原生模块
        };

        results.push(resultItem);
      });

      // 区域过滤
      let filteredResults = results;
      if (needLimitArea && scanArea) {
        filteredResults = filterByArea(results, scanArea);
      }

      // 正则过滤
      filteredResults = filterByRegex(filteredResults, resultIncludeRegs, resultExcludeRegs);

      // 记录原生结果（如果需要）
      if (openEmptyReturnResults && onBarCodeReadNative) {
        const nativeResults: INativeBarCodeResult[] = results.map((item) => ({
          data: item.data,
          type: item.type,
          filterBy: filteredResults.find((r) => r.data === item.data)
            ? 'null'
            : results.find(
                  (r) => r.data === item.data && !filteredResults.find((f) => f.data === r.data),
                )
              ? 'ares'
              : 'reg',
        }));
        onBarCodeReadNative(nativeResults);
      }

      // 记录处理耗时（可用于上报）
      const processCost = Date.now() - startTime;
      if (openReportTime && processCost > 0) {
        // TODO: 实现时长上报
      }

      return filteredResults;
    },
    [
      codeFormatList,
      needLimitArea,
      scanArea,
      resultIncludeRegs,
      resultExcludeRegs,
      openEmptyReturnResults,
      onBarCodeReadNative,
      onTransformOriginCodes,
    ],
  );

  // 区域过滤
  const filterByArea = useCallback(
    (results: IScanResultItem[], area: typeof scanArea): IScanResultItem[] => {
      if (!area || !needLimitArea) {
        return results;
      }

      const { scanWidth, scanHeight, topOffset } = area;
      const { width: screenWidth } = Dimensions.get('window');

      // 计算扫码框边界
      const leftBound = (screenWidth - scanWidth) / 2;
      const rightBound = leftBound + scanWidth;
      const topBound = topOffset;
      const bottomBound = topOffset + scanHeight;

      // 计算扫码框中心点
      const centerX = screenWidth / 2;
      const centerY = topOffset + scanHeight / 2;

      const validResults = results
        .map((item) => {
          // 如果没有坐标信息，无法进行区域过滤
          if (
            item.left_dp === undefined ||
            item.right_dp === undefined ||
            item.top_dp === undefined ||
            item.bottom_dp === undefined
          ) {
            return { item, distance: 0 };
          }

          // 计算条码中心点
          const itemCenterX = (item.left_dp + item.right_dp) / 2;
          const itemCenterY = (item.top_dp + item.bottom_dp) / 2;

          // 判断是否在区域内（含容差）
          const inArea =
            itemCenterX >= leftBound - AREA_TOLERANCE &&
            itemCenterX <= rightBound + AREA_TOLERANCE &&
            itemCenterY >= topBound - AREA_TOLERANCE &&
            itemCenterY <= bottomBound + AREA_TOLERANCE;

          if (!inArea) {
            return null;
          }

          // 计算距离扫码框中心点的距离
          const distance = Math.sqrt(
            Math.pow(itemCenterX - centerX, 2) + Math.pow(itemCenterY - centerY, 2),
          );

          return { item, distance };
        })
        .filter((item): item is { item: IScanResultItem; distance: number } => item !== null)
        .sort((a, b) => a.distance - b.distance)
        .map(({ item }) => item);

      return validResults;
    },
    [needLimitArea],
  );

  // 正则过滤
  const filterByRegex = useCallback(
    (
      results: IScanResultItem[],
      includeRegs: RegExp[],
      excludeRegs: RegExp[],
    ): IScanResultItem[] => {
      let filtered = results;

      // 先执行排除规则
      if (excludeRegs.length > 0) {
        filtered = filtered.filter((item) => {
          return !excludeRegs.some((reg) => reg.test(item.data));
        });
      }

      // 再执行包含规则
      if (includeRegs.length > 0) {
        filtered = filtered.filter((item) => {
          return includeRegs.some((reg) => reg.test(item.data));
        });
      }

      return filtered;
    },
    [],
  );

  // 处理积累结果
  const handleAccumulateResult = useCallback(
    (results: IScanResultItem[]): IScanResultItem[] => {
      if (!openAccumulateResult) {
        return results;
      }

      // 清除旧的积累结果
      if (accumulateTimerRef.current) {
        clearTimeout(accumulateTimerRef.current);
      }

      // 更新积累结果
      results.forEach((item) => {
        const key = `${item.data}_${item.type}`;
        const existing = accumulateResultsRef.current.get(key);
        if (existing) {
          existing.count += 1;
          existing.item = item;
        } else {
          accumulateResultsRef.current.set(key, { count: 1, item });
        }
      });

      // 设置定时器，在时间窗口后返回结果
      accumulateTimerRef.current = setTimeout(() => {
        let maxCount = 0;
        let bestResult: IScanResultItem | null = null;

        accumulateResultsRef.current.forEach(({ count, item }) => {
          if (count > maxCount) {
            maxCount = count;
            bestResult = item;
          } else if (count === maxCount && bestResult === null) {
            // 如果次数相同，优先返回最新的
            bestResult = item;
          } else if (count === maxCount && bestResult !== null) {
            // 如果次数相同，优先返回最新的
            bestResult = item;
          }
        });

        accumulateResultsRef.current.clear();

        if (bestResult !== null && onBarCodeRead) {
          const finalResult: IScanResultItem = bestResult;
          const result: IBarCodeReadResult = {
            data: finalResult.data,
            type: finalResult.type,
            resultList: [finalResult],
          };
          onBarCodeRead(result);
        }
      }, accumulateTimeInterval);

      return results;
    },
    [openAccumulateResult, accumulateTimeInterval, onBarCodeRead],
  );

  // 扫码回调处理
  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      if (!isActive || codes.length === 0) {
        return;
      }

      // 清除超时定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const processedResults = processScanResult(codes);

      if (processedResults.length === 0) {
        return;
      }

      // 震动反馈
      if (vibrate) {
        Vibration.vibrate(100);
      }

      // 声音提示（需要业务层实现）
      if (beep) {
        // TODO: 实现声音播放
      }

      // 处理积累结果
      if (openAccumulateResult) {
        handleAccumulateResult(processedResults);
        return;
      }

      // 处理积累结果
      if (openAccumulateResult) {
        handleAccumulateResult(processedResults);
        return;
      }

      // 快速模式：返回结果列表
      if (fastMode && onBarCodeReadList) {
        onBarCodeReadList(processedResults);
      }

      // 标准模式：返回第一个结果
      if (onBarCodeRead && processedResults.length > 0) {
        const firstResult = processedResults[0];
        const result: IBarCodeReadResult = {
          data: firstResult.data,
          type: firstResult.type,
          resultList: fastMode ? processedResults : undefined,
        };
        onBarCodeRead(result);
      }
    },
    [
      isActive,
      processScanResult,
      vibrate,
      beep,
      openAccumulateResult,
      handleAccumulateResult,
      fastMode,
      onBarCodeRead,
      onBarCodeReadList,
    ],
  );

  // 配置 codeScanner
  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'ean-8',
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'upc-a',
      'upc-e',
      'pdf-417',
    ],
    onCodeScanned: handleCodeScanned,
  });

  // 扫描动画
  useEffect(() => {
    if (needAnim && isActive) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
      return () => {
        animation.stop();
      };
    }
    return undefined;
  }, [needAnim, isActive, scanLineAnim]);

  // 超时处理
  useEffect(() => {
    if (singleScanOutTime && isActive) {
      startTimeRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        onBarCodeReadTimeout?.();
      }, singleScanOutTime);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    return undefined;
  }, [singleScanOutTime, isActive, onBarCodeReadTimeout, scanKey]);

  // 闪光灯控制
  useEffect(() => {
    // vision-camera 的闪光灯通过 torch 属性控制
    // 这里需要在 Camera 组件上设置
  }, [flashlight]);

  // 相机错误处理
  const handleCameraError = useCallback(
    (error: Error) => {
      console.error('相机错误:', error);
      onCameraError?.(error);

      // 自动重试（最多2次）
      if (retryCountRef.current < 2) {
        retryCountRef.current += 1;
        setScanKey((prev) => prev + 1);
      } else {
        showError('相机打开失败，请检查设备');
      }
    },
    [onCameraError],
  );

  // 清理函数
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (accumulateTimerRef.current) {
        clearTimeout(accumulateTimerRef.current);
      }
    };
  }, []);

  // 权限未授予时的 UI
  if (!isGranted) {
    if (isBlocked) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.permissionContainer}>
            {/* TODO: 渲染权限提示 UI，引导用户去设置 */}
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.container, style]}>
        <View style={styles.permissionContainer}>{/* TODO: 渲染权限请求 UI */}</View>
      </View>
    );
  }

  // 设备不可用
  if (!device) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.permissionContainer}>{/* TODO: 渲染设备不可用提示 */}</View>
      </View>
    );
  }

  // 计算扫描区域遮罩
  const renderMask = () => {
    if (!scanArea) {
      return null;
    }

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const { scanWidth, scanHeight, topOffset } = scanArea;

    const leftOffset = (screenWidth - scanWidth) / 2;
    const topOffsetPx = topOffset;
    const bottomOffset = topOffsetPx + scanHeight;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents='none'>
        {/* 顶部遮罩 */}
        <View style={[styles.mask, { height: topOffsetPx, backgroundColor: maskColor }]} />
        {/* 左侧遮罩 */}
        <View
          style={[
            styles.mask,
            {
              top: topOffsetPx,
              left: 0,
              width: leftOffset,
              height: scanHeight,
              backgroundColor: maskColor,
            },
          ]}
        />
        {/* 右侧遮罩 */}
        <View
          style={[
            styles.mask,
            {
              top: topOffsetPx,
              right: 0,
              width: leftOffset,
              height: scanHeight,
              backgroundColor: maskColor,
            },
          ]}
        />
        {/* 底部遮罩 */}
        <View
          style={[
            styles.mask,
            {
              top: bottomOffset,
              height: screenHeight - bottomOffset,
              backgroundColor: maskColor,
            },
          ]}
        />
      </View>
    );
  };

  // 渲染扫描线动画
  const renderScanLine = () => {
    if (!needAnim || !scanArea) {
      return null;
    }

    const { scanWidth, scanHeight, topOffset } = scanArea;
    const { width: screenWidth } = Dimensions.get('window');
    const leftOffset = (screenWidth - scanWidth) / 2;

    const translateY = scanLineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [topOffset, topOffset + scanHeight],
    });

    return (
      <Animated.View
        style={[
          styles.scanLine,
          {
            left: leftOffset,
            width: scanWidth,
            transform: [{ translateY }],
          },
        ]}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Camera
        key={scanKey}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        torch={flashlight ? 'on' : 'off'}
        onError={handleCameraError}
      />
      {renderMask()}
      {renderScanLine()}
    </View>
  );
};

// 导出常量
export { SUPPORT_CODE_TYPE, FILTER_BY_TYPE } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mask: {
    backgroundColor: '#99000000',
    position: 'absolute',
  },
  scanLine: {
    height: 2,
    backgroundColor: '#00FF00',
    position: 'absolute',
  },
});
