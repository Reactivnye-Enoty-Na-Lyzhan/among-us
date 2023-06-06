import { isWithinBoundaries } from './isWithinBoundaries';
import { SPEED } from './consts';
import { ICurrentPlayer, IBackground } from './types';

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

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', ({ code }) => {
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
  });

  window.addEventListener('keyup', ({ code }) => {
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
  });
}

export const movePlayer = (player: ICurrentPlayer, background: IBackground) => {
  if (
    keys.w.pressed &&
    isWithinBoundaries(background.x, background.y + SPEED)
  ) {
    player.update(0, -1);
  }
  if (
    keys.d.pressed &&
    isWithinBoundaries(background.x - SPEED, background.y)
  ) {
    player.update(1, 0);
  }
  if (
    keys.s.pressed &&
    isWithinBoundaries(background.x, background.y - SPEED)
  ) {
    player.update(0, 1);
  }
  if (
    keys.a.pressed &&
    isWithinBoundaries(background.x + SPEED, background.y)
  ) {
    player.update(-1, 0);
  }
};
