import { isObject } from './isObject';
import { ObjectType } from './types/objectType';

export function deepMergeTyped<ResultType extends ObjectType>(
  target: ObjectType,
  ...sources: ObjectType[]
): ResultType {
  const mergeResult = deepMerge(target, ...sources) as ResultType;

  return mergeResult;
}

export function deepMerge(
  target: ObjectType,
  ...sources: ObjectType[]
): ObjectType {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();
  if (source === undefined) {
    return target;
  }

  if (isMergeableObject(target) && isMergeableObject(source)) {
    Object.entries(source).forEach(function ([sourceKey, sourceValue]) {
      if (isMergeableObject(sourceValue)) {
        if (!Object.getOwnPropertyDescriptor(target, sourceKey)) {
          target[sourceKey] = {};
        }

        const targetValue = target[sourceKey];
        if (isMergeableObject(targetValue)) {
          deepMerge(targetValue, sourceValue);
        }
      } else {
        target[sourceKey] = sourceValue;
      }
    });
  }

  return deepMerge(target, ...sources);
}

const isMergeableObject = (item: unknown): item is ObjectType => {
  return isObject(item) && !Array.isArray(item);
};
