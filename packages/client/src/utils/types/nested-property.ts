import type { ObjectKey, ObjectType } from './object';

export type NestedKeysArrayLikePaths<InputType> = {
  [Key in keyof InputType & ObjectKey]: InputType[Key] extends ObjectType
    ? [Key] | [Key, ...NestedKeysArrayLikePaths<InputType[Key]>]
    : [Key];
}[keyof InputType & ObjectKey];

type PathRootAndRest<ArrayLikePath extends ObjectKey[]> =
  ArrayLikePath extends [infer Root, ...infer Rest]
    ? Rest extends never[]
      ? [Root, never]
      : [Root, never]
    : [never, never];
type PathRootAndRestType =
  | [ObjectKey, never]
  | [ObjectKey, ObjectKey[]]
  | [never, never];

export type NestedPropertyType<
  InputType,
  ArrayLikePath extends ObjectKey[],
  Path extends PathRootAndRestType = PathRootAndRest<ArrayLikePath>,
  PathRoot extends ObjectKey | never = Path[0],
  PathRest extends ObjectKey[] | never = Path[1]
> = InputType extends ObjectType
  ? PathRoot extends keyof InputType
    ? [PathRest] extends [never]
      ? InputType[PathRoot]
      : NestedPropertyType<InputType[PathRoot], PathRest>
    : undefined
  : undefined;
