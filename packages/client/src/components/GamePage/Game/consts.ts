import map from '@/images/game/map.png';
import playerSpriteWhiteLeft from '@/images/game/player-sprite-white-left.png';
import playerSpriteWhiteRight from '@/images/game/player-sprite-white-right.png';
import deadAquamarineSrc from '@/images/game/players/dead/dead_aquamarine.svg';
import deadBlueSrc from '@/images/game/players/dead/dead_blue.svg';
import deadBrownSrc from '@/images/game/players/dead/dead_brown.svg';
import deadGreenSrc from '@/images/game/players/dead/dead_green.svg';
import deadGreySrc from '@/images/game/players/dead/dead_grey.svg';
import deadPurpleSrc from '@/images/game/players/dead/dead_purple.svg';
import deadRedSrc from '@/images/game/players/dead/dead_red.svg';
import deadWhiteSrc from '@/images/game/players/dead/dead_white.svg';
import deadYellowSrc from '@/images/game/players/dead/dead_yellow.svg';
import aquamarineSrc from '@/images/game/players/player_aquamarine.svg';
import blueSrc from '@/images/game/players/player_blue.svg';
import brownSrc from '@/images/game/players/player_brown.svg';
import greenSrc from '@/images/game/players/player_green.svg';
import greySrc from '@/images/game/players/player_grey.svg';
import purpleSrc from '@/images/game/players/player_purple.svg';
import redSrc from '@/images/game/players/player_red.svg';
import whiteSrc from '@/images/game/players/player_white.svg';
import yellowSrc from '@/images/game/players/player_yellow.svg';

const MAP_OFFSET = {
  x: -1801,
  y: -838,
};

const SPEED = 3;

const CANVAS = {
  width: 1280,
  height: 720,
};

let playerSpriteRight: HTMLImageElement;
let playerSpriteLeft: HTMLImageElement;
let gameMap: HTMLImageElement;

let deadAquamarine: HTMLImageElement;
let deadBlue: HTMLImageElement;
let deadBrown: HTMLImageElement;
let deadGreen: HTMLImageElement;
let deadGrey: HTMLImageElement;
let deadPurple: HTMLImageElement;
let deadRed: HTMLImageElement;
let deadWhite: HTMLImageElement;
let deadYellow: HTMLImageElement;

let deadTextures: any;

let aquamarine: HTMLImageElement;
let blue: HTMLImageElement;
let brown: HTMLImageElement;
let green: HTMLImageElement;
let grey: HTMLImageElement;
let purple: HTMLImageElement;
let red: HTMLImageElement;
let white: HTMLImageElement;
let yellow: HTMLImageElement;

let playerSprites: any;






if (typeof window !== 'undefined') {
  playerSpriteRight = new Image();
  playerSpriteRight.src = playerSpriteWhiteRight;

  playerSpriteLeft = new Image();
  playerSpriteLeft.src = playerSpriteWhiteLeft;

  gameMap = new Image();
  gameMap.src = map;

  deadAquamarine = new Image();
  deadAquamarine.src = deadAquamarineSrc;
  deadBlue = new Image();
  deadBlue.src = deadBlueSrc;
  deadBrown = new Image();
  deadBrown.src = deadBrownSrc;
  deadGreen = new Image();
  deadGreen.src = deadGreenSrc;
  deadGrey = new Image();
  deadGrey.src = deadGreySrc;
  deadPurple = new Image();
  deadPurple.src = deadPurpleSrc;
  deadRed = new Image();
  deadRed.src = deadRedSrc;
  deadWhite = new Image();
  deadWhite.src = deadWhiteSrc;
  deadYellow = new Image();
  deadYellow.src = deadYellowSrc;

  deadTextures = {
    'aquamarine': deadAquamarine,
    'blue': deadBlue,
    'brown': deadBrown,
    'green': deadGreen,
    'grey': deadGrey,
    'purple': deadPurple,
    'red': deadRed,
    'white': deadWhite,
    'yellow': deadYellow,
};

  aquamarine = new Image();
  aquamarine.src = aquamarineSrc;
  blue = new Image();
  blue.src = blueSrc;
  brown = new Image();
  brown.src = brownSrc;
  green = new Image();
  green.src = greenSrc;
  grey = new Image();
  grey.src = greySrc;
  purple = new Image();
  purple.src = purpleSrc;
  red = new Image();
  red.src = redSrc;
  white = new Image();
  white.src = whiteSrc;
  yellow = new Image();
  yellow.src = yellowSrc;

  playerSprites = {
    'aquamarine': aquamarine,
    'blue': blue,
    'brown': brown,
    'green': green,
    'grey': grey,
    'purple': purple,
    'red': red,
    'white': white,
    'yellow': yellow,
  };
}



const PLAYER = {
  height: 50,
  width: 45,
  spriteWidth: 45,
  startPositionX: CANVAS.width / 2 - MAP_OFFSET.x,
  startPositionY: CANVAS.height / 2 - MAP_OFFSET.y,
  collisionRadius: 30,
  deadHeight: 35,
  deadWidth: 50,
};

const TASKS_DATA = [
  {
    id: 1,
    x: 1895,
    y: 1027,
  },
  {
    id: 2,
    x: 1695,
    y: 1027,
  },
];

export {
  gameMap,
  playerSpriteRight,
  MAP_OFFSET,
  SPEED,
  PLAYER,
  CANVAS,
  TASKS_DATA,
  deadTextures,
  playerSprites
};
