/**
 * usePermission Hook 类型定义
 */

import type { Permission, PermissionStatus } from 'react-native-permissions';

// ==================== 单个权限相关类型 ====================

/**
 * 单个权限 Hook 配置选项
 */
export interface IUsePermissionSingleOptions {
  /** 是否在组件挂载时自动检查权限 */
  checkOnMount?: boolean;
  /** 权限被拒绝时的回调 */
  onDenied?: () => void;
  /** 权限被永久拒绝时的回调 */
  onBlocked?: () => void;
  /** 权限被授予时的回调 */
  onGranted?: () => void;
}

/**
 * 单个权限 Hook 返回值
 */
export interface IUsePermissionSingleReturn {
  /** 当前权限状态 */
  status: PermissionStatus | null;
  /** 是否已授予权限 */
  isGranted: boolean;
  /** 是否被拒绝 */
  isDenied: boolean;
  /** 是否被永久拒绝（需要去设置中开启） */
  isBlocked: boolean;
  /** 是否未确定（首次请求） */
  isUnavailable: boolean;
  /** 检查权限状态 */
  checkPermission: () => Promise<void>;
  /** 请求权限 */
  requestPermission: () => Promise<PermissionStatus>;
  /** 打开应用设置页面 */
  openAppSettings: () => Promise<void>;
}

// ==================== 多个权限相关类型 ====================

/**
 * 多个权限 Hook 配置选项
 */
export interface IUsePermissionMultipleOptions {
  /** 是否在组件挂载时自动检查权限 */
  checkOnMount?: boolean;
  /** 所有权限被授予时的回调 */
  onAllGranted?: () => void;
  /** 有权限被拒绝时的回调 */
  onSomeDenied?: (deniedPermissions: Permission[]) => void;
  /** 有权限被永久拒绝时的回调 */
  onSomeBlocked?: (blockedPermissions: Permission[]) => void;
}

/**
 * 多个权限 Hook 返回值
 */
export interface IUsePermissionMultipleReturn {
  /** 所有权限的状态映射 */
  statuses: Record<Permission, PermissionStatus>;
  /** 是否所有权限都已授予 */
  allGranted: boolean;
  /** 被拒绝的权限列表 */
  deniedPermissions: Permission[];
  /** 被永久拒绝的权限列表 */
  blockedPermissions: Permission[];
  /** 未确定的权限列表 */
  unavailablePermissions: Permission[];
  /** 检查所有权限状态 */
  checkPermissions: () => Promise<void>;
  /** 请求所有权限 */
  requestPermissions: () => Promise<Record<Permission, PermissionStatus>>;
  /** 打开应用设置页面 */
  openAppSettings: () => Promise<void>;
}

// ==================== 联合类型 ====================

/**
 * 权限 Hook 配置选项（单个或多个）
 */
export type IUsePermissionOptions =
  | IUsePermissionSingleOptions
  | IUsePermissionMultipleOptions;

/**
 * 权限 Hook 返回值（单个或多个）
 */
export type IUsePermissionReturn =
  | IUsePermissionSingleReturn
  | IUsePermissionMultipleReturn;

