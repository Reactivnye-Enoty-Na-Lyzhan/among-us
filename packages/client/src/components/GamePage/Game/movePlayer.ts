import { isWithinBoundaries } from './isWithinBoundaries';
import { SPEED } from './consts';
import type { ICurrentPlayer, IBackground } from './types';

type KeyboardHandler = (evt: KeyboardEvent) => void;

type MouseEventHandler = (evt: MouseEvent) => void;

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

export const handleKeyDown: KeyboardHandler = ({ code }) => {
  switch (code) {
    case 'KeyW':
      keys.w.pressed = true;
      break;
    case 'KeyA':
      keys.a.pressed = true;
      break;
    case 'KeyS':
      keys.s.pressed = true;
      break;
    case 'KeyD':
      keys.d.pressed = true;
      break;
  }
};

export const handleKeyUp: KeyboardHandler = ({ code }) => {
  switch (code) {
    case 'KeyW':
      keys.w.pressed = false;
      break;
    case 'KeyA':
      keys.a.pressed = false;
      break;
    case 'KeyS':
      keys.s.pressed = false;
      break;
    case 'KeyD':
      keys.d.pressed = false;
      break;
  }
};

export const handleOnBlur = () => {
  keys.w.pressed = false;
  keys.a.pressed = false;
  keys.s.pressed = false;
  keys.d.pressed = false;
};

export const handleContextMenu: MouseEventHandler = evt => {
  evt.preventDefault();
};

export function getMoveFunction() {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);

    window.addEventListener('keyup', handleKeyUp);

    window.addEventListener('blur', handleOnBlur);

    window.addEventListener('contextmenu', handleContextMenu);
  }

  return (player: ICurrentPlayer, background: IBackground) => {
    if (
      keys.w.pressed &&
      (!player.alive || isWithinBoundaries(background.x, background.y + SPEED))
    ) {
      player.update(0, -1);
    }
    if (
      keys.d.pressed &&
      (!player.alive || isWithinBoundaries(background.x - SPEED, background.y))
    ) {
      player.update(1, 0);
    }
    if (
      keys.s.pressed &&
      (!player.alive || isWithinBoundaries(background.x, background.y - SPEED))
    ) {
      player.update(0, 1);
    }
    if (
      keys.a.pressed &&
      (!player.alive || isWithinBoundaries(background.x + SPEED, background.y))
    ) {
      player.update(-1, 0);
    }
  };
}
