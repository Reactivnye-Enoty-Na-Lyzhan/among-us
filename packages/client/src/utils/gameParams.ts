export type GameParamsType = {
  title: string;
  name: keyof InputsParamsType;
  min: number;
  max: number;
  rangeUnit: string;
};

export const gameNamePattern = /^[0-9a-zA-Zа-яА-ЯёЁ-]+$/i;

export const gameParams: GameParamsType[] = [
  {
    title: 'Игроков',
    name: 'players',
    min: 3,
    max: 9,
    rangeUnit: 'игроков',
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

const inputsList = [
  'players',
  'meeting',
  'discussion',
  'interval',
  'title',
] as const;

export type InputsParamsType = {
  [k in (typeof inputsList)[number]]: string;
};

export const inputDefaultValues: InputsParamsType = {
  players: '3',
  meeting: '5',
  discussion: '50',
  interval: '30',
  title: 'БезНазвания',
};

export type DefaultValidityStateType = {
  [k in (typeof inputsList)[number]]: boolean;
};

export const defaultValidityState: DefaultValidityStateType = {
  players: true,
  meeting: true,
  discussion: true,
  interval: true,
  title: true,
};

export type SuitColorsType = {
  [k in (typeof suitsColors)[number]]: boolean;
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
] as const;
