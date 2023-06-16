import { ObjectType } from './objectType';
import { ObjectKeys } from './omitKeys';

export type Optional<T extends ObjectType, K extends ObjectKeys<T>> = Pick<
  Partial<T>,
  K
> &
  Omit<T, K>;
