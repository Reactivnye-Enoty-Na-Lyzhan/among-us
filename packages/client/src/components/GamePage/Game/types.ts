export interface IPlayer {
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  spriteWidth: number;
  id: number;
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
  draw: () => void;
}

export interface ITaskObject extends IInteractionObject {
  id: number;
  checkCollision: () => boolean;
}

export interface IMeetingObject extends IInteractionObject {
  checkCollision: () => void;
}
