export type LogType = 'error' | 'info' | 'log' | 'warn';

export type LogFunctionCommonArgs = {
  logInfo: string;
  logType?: LogType;
};

type LogFunctionArgs = LogFunctionCommonArgs & {
  [key in string]: unknown;
};

export type Logger = {
  readonly defaultLogType: LogType;

  log: (args: LogFunctionArgs) => void;
};
