import { ObjectKey } from '../types/objectType';

export type LoggerContext = {
  pathArray: ObjectKey[];
  existingPath: ObjectKey[];
  value: unknown;
};

export type Logger = (this: LoggerContext) => void;

export type LoggerRelatedArgs = {
  isLogNeeded?: boolean;
  logger?: Logger;
};
