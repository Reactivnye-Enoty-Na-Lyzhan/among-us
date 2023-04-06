export type GameParamsType = {
  title: string;
  name: string;
  min: number;
  max: number;
  rangeUnit: string;
};

export const gameNamePattern = /^[0-9a-zA-Zа-яА-ЯёЁ-]*$/i;

export const gameParams = [
  {
    title: 'Предателей',
    name: 'impostor',
    min: 1,
    max: 4,
    rangeUnit: 'предателей',
  },
  {
    title: 'Экстренных собраний',
    name: 'meeting',
    min: 2,
    max: 10,
    rangeUnit: 'собраний',
  },
  {
    title: 'Время на обсуждение',
    name: 'discussion',
    min: 30,
    max: 90,
    rangeUnit: 'секунд',
  },
  {
    title: 'Перерыв между собраниями',
    name: 'interval',
    min: 10,
    max: 60,
    rangeUnit: 'секунд',
  },
];

export const inputDefaultValues = {
  impostor: '2',
  meeting: '5',
  discussion: '50',
  interval: '30',
  title: 'Без названия',
};

export const defaultValidityState = {
  impostor: true,
  meeting: true,
  discussion: true,
  interval: true,
  title: true,
};

export type SuitColorsType = {
  white: boolean;
  red: boolean;
  green: boolean;
  blue: boolean;
  yellow: boolean;
  purple: boolean;
  aquamarine: boolean;
  brown: boolean;
  grey: boolean;
};

export const suitsColors = [
  'white',
  'red',
  'purple',
  'aquamarine',
  'green',
  'yellow',
  'blue',
  'brown',
  'grey',
];
