/**
 * App 导航相关类型定义
 */

import type { ComponentType } from 'react';

/** Tab 配置项 */
export interface ITabConfig {
  name: string;
  label: string;
  icon: string;
  component: ComponentType;
  moduleKey: string;
}
