import map from '@/images/game/map.png';
import playerSpriteWhiteLeft from '@/images/game/player-sprite-white-left.png';
import playerSpriteWhiteRight from '@/images/game/player-sprite-white-right.png';

const MAP_OFFSET = {
  x: -1801,
  y: -838,
};

const SPEED = 3;

const CANVAS = {
  width: 1280,
  height: 720,
};
const playerSpriteRight = new Image();
playerSpriteRight.src = playerSpriteWhiteRight;

const playerSpriteLeft = new Image();
playerSpriteLeft.src = playerSpriteWhiteLeft;

const gameMap = new Image();
gameMap.src = map;

const PLAYER = {
  height: 50,
  width: 45,
  spriteWidth: 45,
  startPositionX: CANVAS.width / 2 - MAP_OFFSET.x,
  startPositionY: CANVAS.height / 2 - MAP_OFFSET.y,
  collisionRadius: 30,
};
export {
  gameMap,
  playerSpriteRight,
  playerSpriteLeft,
  MAP_OFFSET,
  SPEED,
  PLAYER,
  CANVAS,
};
