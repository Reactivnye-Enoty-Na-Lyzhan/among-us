import { pluralSeconds } from '../plural';

export const getPluralSeconds = (value: number): string => {
  const pluralRules = new Intl.PluralRules('ru-RU');
  return pluralSeconds[pluralRules.select(value)];
};
