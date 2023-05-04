import { NestedPropertyType } from './types/nestedProperty';
import { ObjectKey } from './types/objectType';
import { isObject } from './isObject';

export function getNestedPropertyByPath<
  InputObject,
  ArrayLikePath extends ObjectKey[]
>({
  object,
  pathArray,
  isLogNeeded = false,
}: {
  object: InputObject;
  pathArray: ArrayLikePath;
  isLogNeeded?: boolean;
}): NestedPropertyType<InputObject, ArrayLikePath> | undefined {
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

  const existingPath = existingPathIndex
    ? pathArray.slice(0, existingPathIndex)
    : [];
  if (isLogNeeded) {
    console.log(
      `PATH GET '${pathArray}' EXISTING PART: ` +
        `${existingPath}\n` +
        `value: ${JSON.stringify(value)}`
    );
  }

  return value;
}
