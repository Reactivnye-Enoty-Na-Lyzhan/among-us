import type { LoggingFunction } from '@/types/logging';
import type { LogFunctionCommonArgs, LogType, Logger } from './types';

type InitArgs = {
  defaultLogType?: LogType;
};

type LogFunctionArgs = LogFunctionCommonArgs;

const mapLogTypeToFunction: Record<LogType, LoggingFunction> = {
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

export class ConsoleLogger implements Logger {
  private readonly _defaultLogType: LogType;
  private static readonly _mapLogTypeToFunction = mapLogTypeToFunction;

  constructor({ defaultLogType = 'log' }: InitArgs) {
    this._defaultLogType = defaultLogType;
  }

  public log({ logInfo, logType = this.defaultLogType }: LogFunctionArgs) {
    const logFunction = ConsoleLogger._mapLogTypeToFunction[logType];

    logFunction(logInfo);
  }

  get defaultLogType() {
    return this._defaultLogType;
  }
}
