import { NestedPropertyType } from '../types/nestedProperty';
import { ObjectKey } from '../types/objectType';
import { isObject } from '../isObject';
import type { LoggerContext, LoggerRelatedArgs } from './logger.types';

function defaultLogger(this: LoggerContext) {
  console.log(
    `PATH GET '${this.pathArray}' EXISTING PART: ` +
      `'${this.existingPath}'\n` +
      `value: ${this.value}`
  );
}

export function getNestedPropertyByPath<
  InputObject,
  ArrayLikePath extends ObjectKey[]
>({
  object,
  pathArray,
  isLogNeeded = false,
  logger = defaultLogger,
}: {
  object: InputObject;
  pathArray: ArrayLikePath;
} & LoggerRelatedArgs):
  | NestedPropertyType<InputObject, ArrayLikePath>
  | undefined {
  if (!isObject(object) || !pathArray.length) {
    return undefined;
  }

  let value: any = object;
  let existingPathIndex: number | null = null;
  pathArray.every((currentPath, index) => {
    const isPathExisting = isObject(value) && Object.hasOwn(value, currentPath);

    if (isPathExisting) {
      value = value[currentPath];
      existingPathIndex = index;
    }

    return isPathExisting;
  });

  const existingPath =
    existingPathIndex !== null ? pathArray.slice(0, existingPathIndex + 1) : [];
  if (isLogNeeded) {
    logger.call({
      pathArray,
      existingPath,
      value,
    });
  }

  return value;
}
