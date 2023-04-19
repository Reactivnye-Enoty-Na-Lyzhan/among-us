import { canvasSetup } from './canvasSetup';
import { movePlayer } from './movePlayer';
import { ICrewman, ICurrentPlayer, IInteractionObject, IPlayer } from './types';
import {
  gameMap,
  playerSpriteRight,
  playerSpriteLeft,
  MAP_OFFSET,
  SPEED,
  PLAYER,
} from './consts';

export default function canvasProcess(
  canvas: HTMLCanvasElement,
  emergencyActionBtn: HTMLButtonElement,
  useActionBtn: HTMLButtonElement,
  killActionBtn: HTMLButtonElement
) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvasSetup(canvas);

  const VIEW_OFFSET = {
    x: 0,
    y: 0,
  };

  let gameFrame = 0;

  class Background {
    x: number;
    y: number;
    image: HTMLImageElement;
    constructor() {
      this.x = MAP_OFFSET.x;
      this.y = MAP_OFFSET.y;
      this.image = gameMap;
    }
    update(x: number, y: number) {
      this.x += -x * SPEED;
      this.y += -y * SPEED;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
  const background = new Background();

  abstract class Player implements IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    spriteWidth: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.width = PLAYER.width;
      this.height = PLAYER.height;
      this.image = playerSpriteRight;
      this.spriteWidth = PLAYER.spriteWidth;
    }
  }

  class CurrentPlayer extends Player implements ICurrentPlayer {
    constructor(x: number, y: number) {
      super(x, y);
      this.spriteFrame = 0;
      this.right = true;
    }
    spriteFrame: number;
    right: boolean;

    update(x: number, y: number) {
      this.x += x * SPEED;
      this.y += y * SPEED;
      background.update(x, y);
      VIEW_OFFSET.x -= x * SPEED;
      VIEW_OFFSET.y -= y * SPEED;

      if (this.right && x < 0) {
        this.right = false;
        this.image = playerSpriteLeft;
      } else if (!this.right && x > 0) {
        this.right = true;
        this.image = playerSpriteRight;
      }

      if (gameFrame % 5 === 0) {
        if (this.spriteFrame === 3) {
          this.spriteFrame = 0;
        } else {
          this.spriteFrame++;
        }
      }
      table.checkCollision();
      task.checkCollision();
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.spriteFrame * this.spriteWidth,
        0,
        this.spriteWidth,
        50,
        canvas.width / 2 - this.width / 2,
        canvas.height / 2 - this.height / 2,
        this.width,
        this.height
      );
    }
  }
  const player = new CurrentPlayer(
    PLAYER.startPositionX,
    PLAYER.startPositionY
  );

  const checkCollisions = (
    x: number,
    y: number,
    radius: number,
    btnEl: HTMLButtonElement
  ) => {
    const ddx = x - player.x;
    const ddy = y - player.y;
    const distance = Math.floor(Math.sqrt(ddx * ddx + ddy * ddy));
    if (distance > radius + player.height / 2) {
      if (btnEl.style.display !== 'none') btnEl.style.display = 'none';
    } else {
      if (btnEl.style.display !== 'block') {
        btnEl.style.display = 'block';
      }
    }
  };

  class Crewman extends Player implements ICrewman {
    renderX: number;
    renderY: number;
    btnElement: HTMLButtonElement;
    radius: number;
    constructor(x: number, y: number, btnEl: HTMLButtonElement) {
      super(x, y);
      this.renderX = this.x + MAP_OFFSET.x;
      this.renderY = this.y + MAP_OFFSET.y;
      this.btnElement = btnEl;
      this.radius = PLAYER.collisionRadius;
    }
    update(x: number, y: number) {
      this.x += -x * SPEED;
      this.y += -y * SPEED;
    }
    checkCollision() {
      checkCollisions(this.x, this.y, this.radius, this.btnElement);
    }
    render() {
      this.renderX = this.x + MAP_OFFSET.x + VIEW_OFFSET.x;
      this.renderY = this.y + MAP_OFFSET.y + VIEW_OFFSET.y;
      this.draw();
    }
    draw() {
      ctx.drawImage(
        this.image,
        0,
        0,
        this.spriteWidth,
        this.height,
        this.renderX,
        this.renderY,
        this.width,
        this.height
      );
    }
  }
  const crewman = new Crewman(1500, 500, killActionBtn);

  class InteractionObject implements IInteractionObject {
    x: number;
    y: number;
    radius: number;
    btnElement: HTMLButtonElement;
    constructor(x: number, y: number, radius: number, btn: HTMLButtonElement) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.btnElement = btn;
    }
    checkCollision() {
      checkCollisions(this.x, this.y, this.radius, this.btnElement);
    }
  }
  const table = new InteractionObject(2410, 545, 150, emergencyActionBtn);
  const task = new InteractionObject(1895, 1027, 30, useActionBtn);

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    background.draw();
    crewman.render();
    player.draw();
    crewman.checkCollision();
    movePlayer(player, background);
    gameFrame++;
    window.requestAnimationFrame(gameLoop);
  }
  gameLoop();
}
