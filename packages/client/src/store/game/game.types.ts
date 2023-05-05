import { SuitColorsType } from '@/utils/gameParams';

export interface IGameState {
  online: boolean;
  title: string;
  status: GameStatusType;
  stage: GameStageType;
  params: IGameStateParams;
  player: IPlayer;
  startCooldown: number;
  results: IResults;
}

export interface IGameStateParams {
  impostors: number;
  meetings: number;
  meetingDuration: number;
  meetingCooldown: number;
}

export type GameStatusType = 'start' | 'preparing' | 'active' | 'finished';

export type GameStageType =
  | 'init'
  | 'starting'
  | 'preparing'
  | 'activating'
  | 'finishing';

export interface IPlayer {
  id: string,
  color: ColorType;
}

export type ColorType = keyof SuitColorsType;

export interface IResults {
  result: 'init' | 'win' | 'lose';
  score: number;
}
