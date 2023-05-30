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
  killActionBtn: HTMLButtonElement,
  players: any,
  playerId: any,
  socket: any,
  gameId: any
) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvasSetup(canvas);

  console.log('players: ', players);
  console.log('you: ', playerId);
  console.log('game: ', gameId);


  const otherPlayersInitial = players.filter((player:any) => player.id !== playerId);
  const currentPlayerInitial = players.find((player: any)=> player.id === playerId);

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
    color: string;
    id:string;
    name: string;
    impostor: boolean;
    constructor(x: number, y: number, color: string, id: string, name: string, impostor: boolean) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.width = PLAYER.width;
      this.height = PLAYER.height;
      this.image = playerSpriteRight;
      this.spriteWidth = PLAYER.spriteWidth;
      this.color = color;
      this.name = name;
      this.impostor = impostor;
    }
  }

  class CurrentPlayer extends Player implements ICurrentPlayer {
    constructor(x: number, y: number, color: string, id: string, impostor: boolean, name: string) {
      super(x, y, color, id, name, impostor);
      this.spriteFrame = 0;
      this.right = true;
    }
    spriteFrame: number;
    right: boolean;

    update(x: number, y: number) {
      socket.emit('move', {id: playerId, x: x, y: y, gameId: gameId});
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
    PLAYER.startPositionY,
    currentPlayerInitial.color,
    currentPlayerInitial.id, 
    currentPlayerInitial.impostor,
    currentPlayerInitial.name
  );

  const checkPlayersCollisions = ()=> {
    const btnEl = killActionBtn;
    let idToKill: string | undefined = undefined;
    crewmen.forEach(crewman => {
        if(!crewman.impostor && crewman.checkCollision()) {
            idToKill = crewman.id;
        }
    }); 
    if (idToKill) {
        if (btnEl.style.display !== 'block') btnEl.style.display = 'block';
        if (btnEl.dataset.idToKill !== idToKill) {
            btnEl.dataset.idToKill = idToKill;
        }
    } else {
        if (btnEl.style.display !== 'none') btnEl.style.display = 'none';
    }
  };

  const checkCollisions = (
    x: number,
    y: number,
    radius: number,
  ) => {
    const ddx = x - player.x;
    const ddy = y - player.y;
    const distance = Math.floor(Math.sqrt(ddx * ddx + ddy * ddy));
    if (distance > radius + player.height / 2) {
      return false;
    } else {
        return true;
    }
  };

  class Crewman extends Player implements ICrewman {
    renderX: number;
    renderY: number;
    radius: number;
    constructor(id: string, name: string, impostor: boolean, color: string, x: number, y: number) {
      super(x, y, color, id, name, impostor);
      this.renderX = this.x + MAP_OFFSET.x;
      this.renderY = this.y + MAP_OFFSET.y;
      this.radius = PLAYER.collisionRadius;
    }
    update(x: number, y: number) {
      this.x += x * SPEED;
      this.y += y * SPEED;
    }
    checkCollision() {
      return checkCollisions(this.x, this.y, this.radius);
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
        this.renderX - this.width/2,
        this.renderY - this.height/2,
        this.width,
        this.height
      );
      ctx.beginPath();
      ctx.arc(this.renderX, this.renderY, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  const crewmen: any[] = [];
  otherPlayersInitial.forEach((player: any) => {
    crewmen.push(new Crewman(player.id, player.name, player.impostor, player.color, PLAYER.startPositionX, PLAYER.startPositionY));
  });

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
      if(checkCollisions(this.x, this.y, this.radius)) {
        if(this.btnElement.style.display !== 'block') this.btnElement.style.display = 'block';
      } else {
        if (this.btnElement.style.display !== 'none') this.btnElement.style.display = 'none';
      }
    }
  }
  const table = new InteractionObject(2410, 545, 150, emergencyActionBtn);
  const task = new InteractionObject(1895, 1027, 30, useActionBtn);

  
  function moveCrewman ({id, x, y}: {id: string, x: number, y: number}) {
    crewmen.filter((obj)=>obj.id === id)[0].update(x, y);
    console.log(id, x, y);
  };
  socket.on('move', moveCrewman);  
   


  function gameLoop() {
    if (typeof window === 'undefined') {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    background.draw();
    crewmen.forEach(crewman => crewman.render());
    player.draw();
    movePlayer(player, background);
    gameFrame++;
    checkPlayersCollisions();
    window.requestAnimationFrame(gameLoop);

  }
  gameLoop();
  return moveCrewman;
}
