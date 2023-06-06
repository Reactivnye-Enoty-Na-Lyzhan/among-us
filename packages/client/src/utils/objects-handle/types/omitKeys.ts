import { ObjectType } from './objectType';

export type ObjectKeys<T extends ObjectType> = {
  [key in keyof T]-?: key;
}[keyof T];

export type OmitKeys<T extends ObjectType, K extends ObjectKeys<T>> = Omit<
  T,
  K
>;
