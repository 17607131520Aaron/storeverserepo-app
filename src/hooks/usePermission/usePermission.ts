/**
 * usePermission Hook
 * 用于检查和请求单个或多个权限
 * 支持单个权限和多个权限的统一 API
 */

import { useCallback, useEffect, useState } from 'react';
import {
  check,
  checkMultiple,
  openSettings,
  request,
  requestMultiple,
  type Permission,
  type PermissionStatus,
  RESULTS,
} from 'react-native-permissions';

import type {
  IUsePermissionMultipleOptions,
  IUsePermissionMultipleReturn,
  IUsePermissionSingleOptions,
  IUsePermissionSingleReturn,
} from './types';

// ==================== 单个权限实现 ====================

function usePermissionSingle(
  permission: Permission,
  options: IUsePermissionSingleOptions = {},
): IUsePermissionSingleReturn {
  const { checkOnMount = true, onDenied, onBlocked, onGranted } = options;

  const [status, setStatus] = useState<PermissionStatus | null>(null);

  // 检查权限状态
  const checkPermission = useCallback(async () => {
    try {
      const result = await check(permission);
      setStatus(result);

      // 触发相应的回调
      if (result === RESULTS.GRANTED && onGranted) {
        onGranted();
      } else if (result === RESULTS.DENIED && onDenied) {
        onDenied();
      } else if (result === RESULTS.BLOCKED && onBlocked) {
        onBlocked();
      }
    } catch (error) {
      console.error(`检查权限失败: ${permission}`, error);
    }
  }, [permission, onDenied, onBlocked, onGranted]);

  // 请求权限
  const requestPermission = useCallback(async (): Promise<PermissionStatus> => {
    try {
      const result = await request(permission);
      setStatus(result);

      // 触发相应的回调
      if (result === RESULTS.GRANTED && onGranted) {
        onGranted();
      } else if (result === RESULTS.DENIED && onDenied) {
        onDenied();
      } else if (result === RESULTS.BLOCKED && onBlocked) {
        onBlocked();
      }

      return result;
    } catch (error) {
      console.error(`请求权限失败: ${permission}`, error);
      return RESULTS.UNAVAILABLE;
    }
  }, [permission, onDenied, onBlocked, onGranted]);

  // 打开应用设置
  const openAppSettings = useCallback(async () => {
    try {
      await openSettings();
    } catch (error) {
      console.error('打开应用设置失败', error);
    }
  }, []);

  // 组件挂载时检查权限
  useEffect(() => {
    if (checkOnMount) {
      checkPermission();
    }
  }, [checkOnMount, checkPermission]);

  // 计算派生状态
  const isGranted = status === RESULTS.GRANTED;
  const isDenied = status === RESULTS.DENIED;
  const isBlocked = status === RESULTS.BLOCKED;
  const isUnavailable = status === RESULTS.UNAVAILABLE;

  return {
    status,
    isGranted,
    isDenied,
    isBlocked,
    isUnavailable,
    checkPermission,
    requestPermission,
    openAppSettings,
  };
}

// ==================== 多个权限实现 ====================

function usePermissionMultiple(
  permissions: Permission[],
  options: IUsePermissionMultipleOptions = {},
): IUsePermissionMultipleReturn {
  const { checkOnMount = true, onAllGranted, onSomeDenied, onSomeBlocked } = options;

  const [statuses, setStatuses] = useState<Record<Permission, PermissionStatus>>(
    {} as Record<Permission, PermissionStatus>,
  );

  // 检查所有权限状态
  const checkPermissions = useCallback(async () => {
    try {
      const results = await checkMultiple(permissions);
      setStatuses(results);

      // 分析权限状态
      const denied: Permission[] = [];
      const blocked: Permission[] = [];
      const granted: Permission[] = [];

      permissions.forEach((permission) => {
        const status = results[permission];
        if (status === RESULTS.DENIED) {
          denied.push(permission);
        } else if (status === RESULTS.BLOCKED) {
          blocked.push(permission);
        } else if (status === RESULTS.GRANTED) {
          granted.push(permission);
        }
      });

      // 触发相应的回调
      if (granted.length === permissions.length && onAllGranted) {
        onAllGranted();
      } else if (denied.length > 0 && onSomeDenied) {
        onSomeDenied(denied);
      } else if (blocked.length > 0 && onSomeBlocked) {
        onSomeBlocked(blocked);
      }
    } catch (error) {
      console.error('检查多个权限失败', error);
    }
  }, [permissions, onAllGranted, onSomeDenied, onSomeBlocked]);

  // 请求所有权限
  const requestPermissions = useCallback(async (): Promise<
    Record<Permission, PermissionStatus>
  > => {
    try {
      const results = await requestMultiple(permissions);
      setStatuses(results);

      // 分析权限状态
      const denied: Permission[] = [];
      const blocked: Permission[] = [];
      const granted: Permission[] = [];

      permissions.forEach((permission) => {
        const status = results[permission];
        if (status === RESULTS.DENIED) {
          denied.push(permission);
        } else if (status === RESULTS.BLOCKED) {
          blocked.push(permission);
        } else if (status === RESULTS.GRANTED) {
          granted.push(permission);
        }
      });

      // 触发相应的回调
      if (granted.length === permissions.length && onAllGranted) {
        onAllGranted();
      } else if (denied.length > 0 && onSomeDenied) {
        onSomeDenied(denied);
      } else if (blocked.length > 0 && onSomeBlocked) {
        onSomeBlocked(blocked);
      }

      return results;
    } catch (error) {
      console.error('请求多个权限失败', error);
      return {} as Record<Permission, PermissionStatus>;
    }
  }, [permissions, onAllGranted, onSomeDenied, onSomeBlocked]);

  // 打开应用设置
  const openAppSettings = useCallback(async () => {
    try {
      await openSettings();
    } catch (error) {
      console.error('打开应用设置失败', error);
    }
  }, []);

  // 组件挂载时检查权限
  useEffect(() => {
    if (checkOnMount) {
      checkPermissions();
    }
  }, [checkOnMount, checkPermissions]);

  // 计算派生状态
  const allGranted = permissions.every((permission) => statuses[permission] === RESULTS.GRANTED);
  const deniedPermissions = permissions.filter(
    (permission) => statuses[permission] === RESULTS.DENIED,
  );
  const blockedPermissions = permissions.filter(
    (permission) => statuses[permission] === RESULTS.BLOCKED,
  );
  const unavailablePermissions = permissions.filter(
    (permission) => statuses[permission] === RESULTS.UNAVAILABLE,
  );

  return {
    statuses,
    allGranted,
    deniedPermissions,
    blockedPermissions,
    unavailablePermissions,
    checkPermissions,
    requestPermissions,
    openAppSettings,
  };
}

// ==================== 统一导出（函数重载） ====================

/**
 * usePermission Hook
 * 用于检查和请求单个或多个权限
 *
 * @example 单个权限
 * const { status, isGranted, requestPermission } = usePermission(
 *   PERMISSIONS.IOS.CAMERA,
 *   {
 *     checkOnMount: true,
 *     onGranted: () => console.log('权限已授予'),
 *   }
 * );
 *
 * @example 多个权限
 * const {
 *   statuses,
 *   allGranted,
 *   requestPermissions,
 * } = usePermission(
 *   [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
 *   {
 *     checkOnMount: true,
 *     onAllGranted: () => console.log('所有权限已授予'),
 *   }
 * );
 */
export function usePermission(
  permission: Permission,
  options?: IUsePermissionSingleOptions,
): IUsePermissionSingleReturn;
export function usePermission(
  permissions: Permission[],
  options?: IUsePermissionMultipleOptions,
): IUsePermissionMultipleReturn;
export function usePermission(
  permissionOrPermissions: Permission | Permission[],
  options?: IUsePermissionSingleOptions | IUsePermissionMultipleOptions,
): IUsePermissionSingleReturn | IUsePermissionMultipleReturn {
  // 判断是单个权限还是多个权限
  if (Array.isArray(permissionOrPermissions)) {
    return usePermissionMultiple(permissionOrPermissions, options as IUsePermissionMultipleOptions);
  }
  return usePermissionSingle(permissionOrPermissions, options as IUsePermissionSingleOptions);
}

// ==================== 向后兼容的导出（可选） ====================

/** @deprecated 使用 usePermission 代替，传入数组即可 */
export const usePermissions = usePermissionMultiple;
