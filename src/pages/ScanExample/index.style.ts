import { StyleSheet } from 'react-native';
import colors from '~/common/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scannerContainer: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
  },
  scanInstruction: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.text,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  itemCard: {
    flexDirection: 'row',
  },
  itemImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagePlaceholderText: {
    fontSize: 24,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  itemInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.black,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // 状态提示样式
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusIcon: {
    color: '#007AFF',
    fontSize: 12,
    marginRight: 8,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    color: '#007AFF',
  },
  footerButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonActive: {
    backgroundColor: '#007AFF',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  footerButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default styles;
