import type { ObjectType } from './types/objectType';

export function isObject(object: unknown): object is ObjectType {
  return object != null && object.constructor.name === 'Object';
}
