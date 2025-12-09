/**
 * 各角色的 Tab 配置
 */

// import { getTabHomeRoutes } from '~/routers';

import type { ITabConfig } from './type';
import type { TUserRole } from '~/store';

import MineHome from '~/pages/Mine';

const MINE_TAB: ITabConfig = {
  name: 'MineTab',
  label: '我的',
  icon: '👤',
  component: MineHome,
  moduleKey: 'mine',
};

// ==================== 各角色的 Tab 配置 ====================
const ROLE_TABS: Record<TUserRole, ITabConfig[]> = {
  engineer: [MINE_TAB],
  institution: [MINE_TAB],
  admin: [MINE_TAB],
};

// 默认 Tab 配置（未登录或角色未知时）
const DEFAULT_TABS: ITabConfig[] = [MINE_TAB];

/**
 * 根据角色获取 Tab 配置
 */
export const getTabsByRole = (role: TUserRole | null): ITabConfig[] => {
  if (!role) return DEFAULT_TABS;
  return ROLE_TABS[role] ?? DEFAULT_TABS;
};
