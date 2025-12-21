/**
 * 各角色的 Tab 配置
 */

import type { ITabConfig } from './type';
import type { TUserRole } from '~/store';

import MineHome from '~/pages/Mine';
import Home from '~/pages/Home';
import AIAssistant from '~/pages/AIAssistant';
import DataAnalysis from '~/pages/DataAnalysis';
const MINE_TAB: ITabConfig = {
  name: 'MineTab',
  label: '我的',
  icon: '👤',
  component: MineHome,
  moduleKey: 'mine',
};

//首页
const HOME_TAB: ITabConfig = {
  name: 'HomeTab',
  label: '首页',
  icon: '🏠',
  component: Home,
  moduleKey: 'home',
};

//AI助手
const AI_ASSISTANT_TAB: ITabConfig = {
  name: 'AIAssistantTab',
  label: 'AI助手',
  icon: '🤖',
  component: AIAssistant,
  moduleKey: 'aiAssistant',
};

//数据分析
const DATA_ANALYSIS_TAB: ITabConfig = {
  name: 'DataAnalysisTab',
  label: '数据分析',
  icon: '📊',
  component: DataAnalysis,
  moduleKey: 'dataAnalysis',
};

// ==================== 各角色的 Tab 配置 ====================
const ROLE_TABS: Record<TUserRole, ITabConfig[]> = {
  engineer: [MINE_TAB],
  institution: [MINE_TAB],
  admin: [MINE_TAB],
};

// 默认 Tab 配置（未登录或角色未知时）
const DEFAULT_TABS: ITabConfig[] = [HOME_TAB, AI_ASSISTANT_TAB, DATA_ANALYSIS_TAB, MINE_TAB];

/**
 * 根据角色获取 Tab 配置
 */
export const getTabsByRole = (role: TUserRole | null): ITabConfig[] => {
  if (!role) return DEFAULT_TABS;
  return ROLE_TABS[role] ?? DEFAULT_TABS;
};
