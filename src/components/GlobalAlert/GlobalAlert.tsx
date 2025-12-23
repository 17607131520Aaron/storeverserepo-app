/**
 * 全局提示框组件
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '~/theme';
import { useGlobalAlertStore } from './store';

/** 格式化内容显示 */
const formatContent = (content?: string | object | React.ReactNode): React.ReactNode => {
  if (!content) {
    return null;
  }

  // 如果是React节点，直接返回
  if (React.isValidElement(content)) {
    return content;
  }

  // 如果是对象，格式化为JSON字符串
  if (typeof content === 'object') {
    try {
      return JSON.stringify(content, null, 2);
    } catch {
      return String(content);
    }
  }

  // 字符串直接返回
  return String(content);
};

/** 全局提示框组件 */
export const GlobalAlert: React.FC = () => {
  const theme = useTheme();
  const { visible, title, content, closable, closeText, style, onClose, hide } =
    useGlobalAlertStore();

  // 处理关闭
  const handleClose = () => {
    hide();
    onClose?.();
  };

  // 处理背景点击
  const handleBackdropPress = () => {
    if (closable) {
      handleClose();
    }
  };

  // 计算弹窗位置样式
  const positionStyle = useMemo(() => {
    switch (style.position) {
      case 'top':
        return { justifyContent: 'flex-start', paddingTop: 60 };
      case 'bottom':
        return { justifyContent: 'flex-end', paddingBottom: 60 };
      case 'center':
      default:
        return { justifyContent: 'center' };
    }
  }, [style.position]);

  // 格式化后的内容
  const formattedContent = useMemo(() => formatContent(content), [content]);

  // 判断内容是否为React节点
  const isReactNode = React.isValidElement(content);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={[styles.container, positionStyle]}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              style={[
                styles.alertBox,
                {
                  backgroundColor: theme.colors.surface,
                  width: style.width,
                  maxHeight: style.maxHeight,
                },
              ]}
            >
              {/* 标题 */}
              {title && (
                <View style={styles.header}>
                  <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
                </View>
              )}

              {/* 内容区域 */}
              {formattedContent && (
                <ScrollView
                  style={styles.contentContainer}
                  contentContainerStyle={styles.contentWrapper}
                  showsVerticalScrollIndicator={true}
                >
                  {isReactNode ? (
                    formattedContent
                  ) : (
                    <Text style={[styles.content, { color: theme.colors.text }]}>
                      {formattedContent}
                    </Text>
                  )}
                </ScrollView>
              )}

              {/* 关闭按钮 */}
              {closable && (
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.closeButtonText}>{closeText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertBox: {
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    maxHeight: 400,
  },
  contentWrapper: {
    paddingVertical: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

