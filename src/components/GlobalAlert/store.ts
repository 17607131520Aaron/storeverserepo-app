/**
 * 全局提示框状态管理
 */

import { createPlainStore } from '~/store/core/createStore';

import type { IGlobalAlertOptions, IGlobalAlertState } from './types';

/** 默认配置 */
const DEFAULT_OPTIONS: Required<Pick<IGlobalAlertOptions, 'closable' | 'closeText'>> & {
  style: Required<Pick<IGlobalAlertOptions['style'], 'position' | 'width' | 'maxHeight'>>;
} = {
  closable: true,
  closeText: '确定',
  style: {
    position: 'center',
    width: '85%',
    maxHeight: '70%',
  },
};

/** 全局提示框 Store */
export const useGlobalAlertStore = createPlainStore<IGlobalAlertState>((set) => ({
  visible: false,
  title: undefined,
  content: undefined,
  closable: DEFAULT_OPTIONS.closable,
  closeText: DEFAULT_OPTIONS.closeText,
  style: DEFAULT_OPTIONS.style,
  onClose: undefined,
  show: (options: IGlobalAlertOptions) => {
    set({
      visible: true,
      title: options.title,
      content: options.content,
      closable: options.closable ?? DEFAULT_OPTIONS.closable,
      closeText: options.closeText ?? DEFAULT_OPTIONS.closeText,
      style: {
        ...DEFAULT_OPTIONS.style,
        ...options.style,
      },
      onClose: options.onClose,
    });
  },
  hide: () => {
    set({
      visible: false,
      title: undefined,
      content: undefined,
      onClose: undefined,
    });
  },
}));

