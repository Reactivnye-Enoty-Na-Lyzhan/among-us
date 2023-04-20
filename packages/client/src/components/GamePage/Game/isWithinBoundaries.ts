import { collisions } from './collisions';
import { PLAYER } from './consts';

export const isWithinBoundaries = (x: number, y: number) => {
  let absPlayerX;
  let absPlayerY;
  if (x < 0) {
    absPlayerX = Math.abs(x) + 635;
  } else if (x > 0) {
    absPlayerX = Math.abs(x - 635);
  } else {
    absPlayerX = 635 - x - PLAYER.width;
  }
  if (y < 0) {
    absPlayerY = Math.abs(y) + 335 + PLAYER.height;
  } else if (y > 0) {
    absPlayerY = Math.abs(y - 335 - PLAYER.height);
  } else {
    absPlayerY = y + 335;
  }
  return !collisions[absPlayerY]
    ? true
    : !collisions[absPlayerY].includes(absPlayerX);
};
