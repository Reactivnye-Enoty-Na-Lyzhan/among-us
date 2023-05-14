import { GameState, TileParams } from './types';

export const TILES: TileParams[] = [
  {
    code: '2-3',
    wireEndA: 2,
    wireEndB: 3,
  },
  {
    code: '2-4',
    wireEndA: 2,
    wireEndB: 4,
  },
];

export const INITIAL_STATE: GameState = {
  wireStart: 1,
  wireEnd: 2,
  tiles: [
    [
      {
        id: 1,
        code: '2-3',
        rotate: 0,
      },
      {
        id: 2,
        code: '2-4',
        rotate: 1,
      },
      {
        id: 3,
        code: '2-3',
        rotate: 1,
      },
    ],
    [
      {
        id: 4,
        code: '2-3',
        rotate: 0,
      },
      {
        id: 5,
        code: '2-3',
        rotate: 0,
      },
      {
        id: 6,
        code: '2-4',
        rotate: 1,
      },
    ],
    [
      {
        id: 7,
        code: '2-3',
        rotate: 1,
      },
      {
        id: 8,
        code: '2-3',
        rotate: 3,
      },
      {
        id: 9,
        code: '2-3',
        rotate: 3,
      },
    ],
  ],
};
