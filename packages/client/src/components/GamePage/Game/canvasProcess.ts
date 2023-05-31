import { canvasSetup } from './canvasSetup';
import { movePlayer } from './movePlayer';
import {
  ICrewman,
  ICurrentPlayer,
  IInteractionObject,
  IPlayer,
  ITaskObject,
  IMeetingObject,
} from './types';
import {
  gameMap,
  MAP_OFFSET,
  SPEED,
  PLAYER,
  TASKS_DATA,
  deadTextures,
  playerSprites,
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

  //TBD

  //add nicknames or logins on the bottom
  //by god, framerate cut





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

  abstract class Player implements IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    spriteWidth: number;
    color: string;
    id: number;
    name: string;
    impostor: boolean;
    alive: boolean;
    right: boolean;
    spriteFrame: number;
    constructor(
      x: number,
      y: number,
      color: string,
      id: number,
      name: string,
      role: string,
    ) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.width = PLAYER.width;
      this.height = PLAYER.height;
      this.image = playerSprites[color];
      this.spriteWidth = PLAYER.spriteWidth;
      this.color = color;
      this.name = name;
      this.impostor = role !== 'civil';
      this.alive = true;
      this.right = true;
      this.spriteFrame = 0;
    }
    die() {
        this.alive = false;
    }
  }

  class CurrentPlayer extends Player implements ICurrentPlayer {
    constructor(
      x: number,
      y: number,
      color: string,
      id: number,
      role: string,
      name: string,
    ) {
      super(x, y, color, id, name, role);
    }

    update(x: number, y: number) {
        if(!this.alive) {
            return;
        }
      socket.emit('move', { id: playerId, x: x, y: y, gameId: gameId });
      this.x += x * SPEED;
      this.y += y * SPEED;
      background.update(x, y);
      VIEW_OFFSET.x -= x * SPEED;
      VIEW_OFFSET.y -= y * SPEED;

      if (this.right && x < 0) {
        this.right = false;
      } else if (!this.right && x > 0) {
        this.right = true;
      }

      if (gameFrame % 5 === 0) {
        if (this.spriteFrame === 3) {
          this.spriteFrame = 0;
        } else {
          this.spriteFrame++;
        }
      }
      table.checkCollision();
      checkObjectArrayCollisions(tasks, useActionBtn, true);
    }
    draw() {
        if (!this.alive) {
            ctx.drawImage(
                deadTextures[this.color],
                canvas.width/2 - this.width / 2,
                canvas.height/2 - this.height / 2,
                PLAYER.deadWidth,
                PLAYER.deadHeight
              );
            return;
        } 
        if (this.right) {
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
        } else {
            flipSpriteHorizontally(
                this.image,
                canvas.width / 2 - this.width / 2,
                canvas.height / 2 - this.height / 2,
                this.spriteFrame * this.spriteWidth,
                0,
                this.spriteWidth,
                50,
                this.width,
                this.height,
              );
        }

    }
  }

  function flipSpriteHorizontally(img: any,x: any,y: any,spriteX: any,spriteY: any,spriteW: any,spriteH: any, imgW: any, imgH:any) {
    ctx.translate(x+spriteW,y);
    ctx.scale(-1,1);
    ctx.drawImage(img,
                  spriteX,spriteY,spriteW,spriteH,0,0,imgW,imgH,
                 );
    ctx.setTransform(1,0,0,1,0,0);
  }

  class Crewman extends Player implements ICrewman {
    renderX: number;
    renderY: number;
    radius: number;
    constructor(
      id: number,
      name: string,
      role: string,
      color: string,
      x: number,
      y: number,
    ) {
      super(x, y, color, id, name, role);
      this.renderX = this.x + MAP_OFFSET.x;
      this.renderY = this.y + MAP_OFFSET.y;
      this.radius = PLAYER.collisionRadius;
    }
    update(x: number, y: number) {
    if(!this.alive) {
        return;
    }
    if (this.right && x < 0) {
        this.right = false;
      } else if (!this.right && x > 0) {
        this.right = true;
      }

      if (gameFrame % 5 === 0) {
        if (this.spriteFrame === 3) {
          this.spriteFrame = 0;
        } else {
          this.spriteFrame++;
        }
      }

      this.x += x * SPEED;
      this.y += y * SPEED;
    }
    checkCollision() {
      if(!this.alive) {
          return false;
      }
      return checkCollisions(this.x, this.y, this.radius);
    }
    render() {
      this.renderX = this.x + MAP_OFFSET.x + VIEW_OFFSET.x;
      this.renderY = this.y + MAP_OFFSET.y + VIEW_OFFSET.y;
      this.draw();
    }
    draw() {
        if (!this.alive) {
            ctx.drawImage(
                deadTextures[this.color],
                this.renderX - this.width / 2,
                this.renderY - this.height / 2,
                PLAYER.deadWidth,
                PLAYER.deadHeight
              );
            return;
        } 
      if (this.right) {
        ctx.drawImage(
            this.image,
            this.spriteFrame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.height,
            this.renderX - this.width / 2,
            this.renderY - this.height / 2,
            this.width,
            this.height
          );
    } else {
        flipSpriteHorizontally(
            this.image,
            this.renderX - this.width / 2,
            this.renderY - this.height / 2,
            this.spriteFrame * this.spriteWidth,
            0,
            this.spriteWidth,
            50,
            this.width,
            this.height,
          );
    }

    }
  }

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
    draw() {
      const renderX = this.x + MAP_OFFSET.x + VIEW_OFFSET.x;
      const renderY = this.y + MAP_OFFSET.y + VIEW_OFFSET.y;
      ctx.beginPath();
      ctx.arc(renderX, renderY, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  class MeetingObject extends InteractionObject implements IMeetingObject {
    constructor(x: number, y: number, radius: number, btn: HTMLButtonElement) {
      super(x, y, radius, btn);
    }
    checkCollision() {
        if (player.impostor) return;
      if (checkCollisions(this.x, this.y, this.radius)) {
        if (this.btnElement.style.display !== 'block')
          this.btnElement.style.display = 'block';
      } else {
        if (this.btnElement.style.display !== 'none')
          this.btnElement.style.display = 'none';
      }
    }
  }

  class TaskObject extends InteractionObject implements ITaskObject {
    id: number;
    constructor(
      x: number,
      y: number,
      radius: number,
      btn: HTMLButtonElement,
      id: number
    ) {
      super(x, y, radius, btn);
      this.id = id;
    }
    checkCollision() {
      return checkCollisions(this.x, this.y, this.radius);
    }
  }

  console.log('you: ', playerId);

  const otherPlayersInitial = players.filter(
    (player: any) => player.id !== playerId
  );
  const currentPlayerInitial = players.find(
    (player: any) => player.id === playerId
  );
  console.log('your role: ', currentPlayerInitial.role);

  const background = new Background();

  const player = new CurrentPlayer(
    PLAYER.startPositionX,
    PLAYER.startPositionY,
    currentPlayerInitial.color,
    currentPlayerInitial.id,
    currentPlayerInitial.role,
    currentPlayerInitial.name,
  );

  const crewmen: any[] = [];
  otherPlayersInitial.forEach((player: any) => {
    crewmen.push(
      new Crewman(
        player.id,
        player.name,
        player.role,
        player.color,
        PLAYER.startPositionX,
        PLAYER.startPositionY,
      )
    );
  });

  const allPlayers = [...crewmen, player];

  const table = new MeetingObject(2410, 545, 150, emergencyActionBtn);

  const tasks: any[] = [];
  TASKS_DATA.forEach((task: any) => {
    tasks.push(new TaskObject(task.x, task.y, 30, useActionBtn, task.id));
  });


  // общая функция проверки коллизии для чего угодно с нашим игроком
  const checkCollisions = (x: number, y: number, radius: number) => {
    const ddx = x - player.x;
    const ddy = y - player.y;
    const distance = Math.floor(Math.sqrt(ddx * ddx + ddy * ddy));
    if (distance > radius + player.height / 2) {
      return false;
    } else {
      return true;
    }
  };


  const checkObjectArrayCollisions = (
    arr: Crewman[] | TaskObject[],
    btnEl: HTMLButtonElement,
    forCivils: boolean
  ) => {
    // проверяем коллизии и показываем кнопку взаимодеействия,
    // для предателя - убийства игроков, для мирных - выполнение заданияж
    if (forCivils && player.impostor) return;
    if (!forCivils && !player.impostor) return;
    let targetId: number | undefined = undefined;
    arr.forEach(obj => {
      if (obj.checkCollision()) {
        targetId = obj.id;
      }
    });
    if (targetId) {
      if (btnEl.style.display !== 'block') btnEl.style.display = 'block';
      if (btnEl.dataset.targetId !== targetId) {
        btnEl.dataset.targetId = targetId;
      }
    } else {
      if (btnEl.style.display !== 'none') btnEl.style.display = 'none';
    }
  };


  function moveCrewman({ id, x, y }: { id: string; x: number; y: number }) {
    crewmen.find(obj => obj.id === id).update(x, y);
  }
  socket.on('move', moveCrewman);

  function handlePlayerKill(id: number) {
    console.log('he dead', id);
    allPlayers.find(obj => obj.id === id).die();
    console.log(crewmen);
  }
  socket.on('onPlayerKill', handlePlayerKill);


  function gameLoop() {
    if (typeof window === 'undefined') {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    background.draw();
    crewmen.forEach(crewman => crewman.render());
    tasks.forEach(task => task.draw());
    player.draw();
    if (player.alive) {
        movePlayer(player, background);
    }
    gameFrame++;
    checkObjectArrayCollisions(crewmen, killActionBtn, false);
    window.requestAnimationFrame(gameLoop);
  }
  gameLoop();


//   const FRAMES_PER_SECOND = 30;
//   const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
// var lastFrameTime = 0;  // the last frame time
// function update(time){
//     if(time-lastFrameTime < FRAME_MIN_TIME){ //skip the frame if the call is too early
//         requestAnimationFrame(update);
//         return; // return as there is nothing to do
//     }
//     lastFrameTime = time; // remember the time of the rendered frame
//     // render the frame
//     requestAnimationFrame(update); // get next farme
// }
// requestAnimationFrame(update); // start animation





  return {moveCrewman, handlePlayerKill};
}
