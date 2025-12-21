import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import { ScanIcon } from '~/components/SvgIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '~/theme';

// 定义组件的 Props 接口
interface ScanCardProps {
  /**
   * 点击"去扫码"按钮的回调函数
   */
  onScanPress?: (event: GestureResponderEvent) => void;

  /**
   * 可选：自定义最外层容器的样式
   */
  style?: ViewStyle;
}

const ScanCard: React.FC<ScanCardProps> = ({ onScanPress, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.card, { backgroundColor: theme.colors.background }, theme.shadows.md]}>
        {/* 左侧文字区域 */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>扫码入库</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            请扫描调拨单条码、二维码
          </Text>
        </View>

        {/* 右侧按钮区域 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.8}
          onPress={onScanPress}
        >
          {/* 图标：scan-helper 类似取景框效果 */}
          <ScanIcon color='#fff' size={20} />
          <Text style={styles.buttonText}>去扫码</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    minWidth: 100,
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginLeft: 6,
  },
});

export default ScanCard;
