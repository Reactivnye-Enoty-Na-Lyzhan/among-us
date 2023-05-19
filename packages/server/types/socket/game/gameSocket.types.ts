import type { Namespace, Socket } from 'socket.io';

export type GameParams = {
  discussion: number;
  impostors: number;
  interval: number;
  meetings: number;
};

export type GameStatus = 'init' | 'preparing' | 'active' | 'finished';

export type GameRole = 'impostor' | 'civil';

export type SuitColorsType = {
  [k in (typeof suitsColors)[number]]: boolean;
};

export const suitsColors = [
  'white',
  'red',
  'purple',
  'aquamarine',
  'green',
  'yellow',
  'blue',
  'brown',
  'grey',
] as const;

export type GameId = number;

export type EmergencyMeeting = (initiatorId: string) => void;

export type GetPlayers = (callback: (players: string[]) => void) => void;

export type SelectedColors = (colors: SuitColorsType) => void;

export type GetSelectedColors = (gameId: GameId, callback: (selectedColors: SuitColorsType) => void) => void;

export type UnselectColor = (gameId: GameId, color: keyof SuitColorsType) => void;

export type SetPlayerReady = (playerId: string) => void;

export type GameReady = (players: string[]) => void;

export type CompleteTask = (taskId: string) => void;

export type KillPlayer = (id: string, callback: (id: string) => void) => void;

export type EndMove = (id: string) => void;

// playerId:number
// /* gameId: GameId */, 
export type JoinGame = (callback: (playerId: string) => void) => void;

export type CreateGame = () => void;

export type FindGame = () => void;

export type ColorSelect = (
  color: keyof SuitColorsType,
  oldColor: keyof SuitColorsType,
  //gameId: number,
  callback: (newColor: keyof SuitColorsType) => void
) => void;

interface IMoveParams {
  id: string;
  x: number;
  y: number;
}

export type Move = (params: IMoveParams) => void;

// Broadcasting
export interface IGameServerToClientEvents {
  move: Move;
  endMove: EndMove;
  selectedColors: SelectedColors;
  killPlayer: KillPlayer;
  gameReady: GameReady;
  emergencyMeeting: EmergencyMeeting;
}

// Receiving Event
export interface IGameClienToServerEvents {
  createGame: CreateGame;
  findGame: FindGame;
  joinGame: JoinGame;
  move: Move;
  endMove: EndMove;
  colorSelect: ColorSelect;
  getSelectedColors: GetSelectedColors;
  unselectColor: UnselectColor;
  killPlayer: KillPlayer;
  completeTask: CompleteTask;
  playerReady: SetPlayerReady;
  getPlayers: GetPlayers;
  assembleMeeting: EmergencyMeeting;
}

// Inter-server
export interface IGameInterServerEvents {
  ping: () => void;
}

// Socket Data
export interface IGameSocketData {
  name: string;
  age: number;
}

export type GameSocketNamespace = Namespace<
  IGameClienToServerEvents,
  IGameServerToClientEvents,
  IGameInterServerEvents,
  IGameSocketData
>;
export type GameSocket = Socket<
  IGameClienToServerEvents,
  IGameServerToClientEvents,
  IGameInterServerEvents,
  IGameSocketData
>;
