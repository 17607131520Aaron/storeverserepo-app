/**
 * 日志系统
 * 提供结构化日志记录，支持不同日志级别和输出目标
 */

import { createDevWsLogger } from './devWsLogger';

/** 日志级别 */
export type TLogLevel = 'debug' | 'info' | 'warn' | 'error';

/** 日志条目 */
export interface ILogEntry {
  /** 级别 */
  level: TLogLevel;
  /** 消息 */
  message: string;
  /** 时间戳 (ISO 8601 格式) */
  timestamp: string;
  /** 上下文数据 */
  context?: Record<string, unknown>;
}

/** 日志器接口 */
export interface ILogger {
  debug: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  error: (message: string, context?: Record<string, unknown>) => void;
  setLevel: (level: TLogLevel) => void;
}

/** 日志级别优先级映射 */
const LOG_LEVEL_PRIORITY: Record<TLogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/** 日志级别颜色映射 (用于控制台输出) */
const LOG_LEVEL_COLORS: Record<TLogLevel, string> = {
  debug: '\x1b[36m', // 青色
  info: '\x1b[32m', // 绿色
  warn: '\x1b[33m', // 黄色
  error: '\x1b[31m', // 红色
};

const RESET_COLOR = '\x1b[0m';

// 与 Metro 共用的端口配置
// 从项目根目录的 devConfig.js 读取，保持与 metro.config.js 一致
// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const { metroPort } = { metroPort: 9000 };

// 仅在开发环境启用的 WebSocket 日志转发地址
// 这里指向 Metro bundler 的 WebSocket 服务，并复用 metroPort
// 如需带 query（例如 role=logger），可以在这里自行拼接
const LOG_WS_URL: string | undefined = __DEV__ ? `ws://localhost:${metroPort}/message` : undefined;

/**
 * 格式化日志条目为字符串
 * 格式: [timestamp] [LEVEL] message {context}
 */
export const formatLogEntry = (entry: ILogEntry): string => {
  const { timestamp, level, message, context } = entry;
  const levelStr = level.toUpperCase();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${levelStr}] ${message}${contextStr}`;
};

/**
 * 创建日志条目
 */
export const createLogEntry = (
  level: TLogLevel,
  message: string,
  context?: Record<string, unknown>,
): ILogEntry => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  context,
});

/**
 * Logger 类实现
 */
class Logger implements ILogger {
  private minLevel: TLogLevel;
  private devWsLogger = createDevWsLogger(LOG_WS_URL);

  constructor() {
    // 生产环境默认过滤 debug 日志
    this.minLevel = __DEV__ ? 'debug' : 'info';
  }

  /**
   * 设置最小日志级别
   */
  setLevel(level: TLogLevel): void {
    this.minLevel = level;
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  /**
   * 检查日志级别是否应该输出
   */
  private shouldLog(level: TLogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.minLevel];
  }

  /**
   * 输出日志到控制台
   */
  private log(level: TLogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = createLogEntry(level, message, context);
    const formattedMessage = formatLogEntry(entry);

    // 开发环境下，尝试将日志转发到 WebSocket（实际实现位于 devWsLogger.ts，可在任意 RN 项目中复用）
    this.devWsLogger.forward(entry);

    // 开发环境使用彩色输出
    if (__DEV__) {
      const color = LOG_LEVEL_COLORS[level];
      const coloredMessage = `${color}${formattedMessage}${RESET_COLOR}`;

      switch (level) {
        case 'debug':
          // eslint-disable-next-line no-console
          console.debug(coloredMessage);
          break;
        case 'info':
          console.info(coloredMessage);
          break;
        case 'warn':
          console.warn(coloredMessage);
          break;
        case 'error':
          console.error(coloredMessage);
          break;
      }
    } else {
      // 生产环境使用普通输出
      switch (level) {
        case 'info':
          console.info(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'error':
          console.error(formattedMessage);
          break;
      }
    }
  }
}

/** 导出单例 logger 实例 */
export const logger = new Logger();

export default logger;
