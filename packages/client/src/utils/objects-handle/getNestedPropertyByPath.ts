import { NestedPropertyType } from '../types/nested-property';
import { ObjectKey } from '../types/object';
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
  let pathExisting: ObjectKey[] = pathArray;
  for (let i = 0; i < pathExisting.length; i++) {
    const currentPath = pathArray[i];

    if (!isObject(value) || !Object.hasOwn(value, currentPath)) {
      pathExisting = pathExisting.slice(0, i);
      value = undefined;
      break;
    }

    const valueForCurrentPath = value[currentPath];
    value = valueForCurrentPath;
  }

  if (isLogNeeded) {
    console.log(
      `PATH GET '${pathArray}' EXISTING PART: ` +
        `${pathExisting}\n` +
        `value: ${JSON.stringify(value)}`
    );
  }

  return value;
}
