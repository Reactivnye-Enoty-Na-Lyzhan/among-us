import { SuitColorsType } from '@/utils/gameParams';
import { GameRole } from '../../../../server/types/socket/game/gameSocket.types';
import { User } from '../auth/auth.types';

export type FoundGameParamType = Pick<IGameStateParams, 'impostors'>;

export interface IFoundGame extends IGame {
  players: number;
  creator: {
    login: string;
    avatar: string;
  };
  param: FoundGameParamType;
}

export interface IGetGamesRequest {
  limit: number;
  offset: number;
}

export interface IGetGamesResponse {
  foundGames: IFoundGame[];
}

export interface IUpdateScoreRequest {
  gameId: GameIdType;
  taskId: number;
  playerId: number;
}

export interface IUpdateScoreResponse {
  score: number;
}

export interface ILeaveGameRequest {
  gameId: GameIdType;
}

export interface ILeaveGameResponse {
  gameId: GameIdType;
}

export interface IGameWithParams extends IGame {
  param: IGameStateParams;
  chat: {
    id: number;
  };
}

export interface IFindGameResponse {
  games: IFoundGame[];
}

export interface IFindGameRequest {
  title: string;
}

export interface IJoinGameResponse {
  player: IPlayer;
}

export interface IJoinGameRequest {
  gameId: GameIdType;
  color: keyof SuitColorsType;
}

export interface IGameCreateRequest {
  title: string;
  params: IGameStateParams;
}

export interface IGameCreateResponse extends IGame {
  param: IGameStateParams;
  chat: {
    id: number;
  };
}

export type GameIdType = number;

export interface IHotGame {
  game: {
    id: GameIdType;
  };
}

export interface ITakeQueueResponse extends IGameWithParams {
  players: IPlayer[];
  color: {
    colors: SuitColorsType;
  };
}

export interface ITakeQueueRequest {
  gameId: GameIdType;
}

export interface ICurentGame extends IGame {
  players: {
    id: number;
  }[];
  param: {
    id: number;
  };
  color: {
    id: number;
  };
  teams: {
    title: string;
    role: GameRole;
    score: number;
  }[];
}

export interface IGame {
  id: GameIdType;
  status: GameStatusType;
  title: string;
}

export interface IPlayerWithUser extends IPlayer {
  user?: Pick<User, 'login' | 'nickname'>;
}

export interface IPlayer {
  id: number | null;
  alive: boolean;
  color: keyof SuitColorsType;
  lastPosition: {
    x: number;
    y: number;
  };
  role: PlayerRoleType;
  score: number;
}

export interface IMessage {
  id: number;
  text: string;
  authorId: number;
}

export type IStartMeeting = IPlayer['id'];

//////////////////////////////

interface IResults {
  winners: PlayerRoleType | null;
}

export interface IMeeting {
  initiator: IPlayer['id'] | null;
  isProccessing: boolean;
  count: number;
  lastMeeting: ReturnType<typeof performance.now> | null;
}

export interface IGameState {
  online: boolean;
  gameId: GameIdType | null;
  title: string;
  status: GameStatusType;
  params: IGameStateParams;
  player: IPlayer;
  playersAmount: number;
  players: IPlayerWithUser[] | [];
  results: IResults;
  chatId: number | null;
  startCooldown: number;
  meetings: IMeeting;
}

export interface IGameStateParams {
  impostors: number;
  meetings: number;
  discussion: number;
  interval: number;
}

/* export type GameStatusType = 'start' | 'preparing' | 'active' | 'finished'; */
export type GameStatusType =
  | 'init'
  | 'assembling'
  | 'characterSelection'
  | 'startAwaiting'
  | 'active'
  | 'finished';

export type GameStageType = 'init' | 'starting' | 'preparing' | 'activating';

export type PlayerRoleType = 'impostor' | 'civil';

export type ColorType = keyof SuitColorsType;
