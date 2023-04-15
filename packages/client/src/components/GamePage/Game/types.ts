export interface IPlayer {
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  spriteWidth: number;
}

export interface ICurrentPlayer extends IPlayer {
  spriteFrame: number;
  right: boolean;
  update: (x: number, y: number) => void;
  draw: () => void;
}
export interface ICrewman extends IPlayer {
  renderX: number;
  renderY: number;
  update: (x: number, y: number) => void;
  draw: () => void;
}

export interface IBackground {
  x: number;
  y: number;
  image: HTMLImageElement;
  update: (x: number, y: number) => void;
  draw: () => void;
}

export interface IInteractionObject {
  x: number;
  y: number;
  radius: number;
  btnElement: HTMLElement;
  checkCollision: () => void;
}
