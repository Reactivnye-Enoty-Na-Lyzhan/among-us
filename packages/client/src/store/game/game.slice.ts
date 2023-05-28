import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TypeRootState } from '..';
import type {
  IGameState,
  IGameStateParams,
  GameStatusType,
  IPlayer,
  IGameWithParams,
} from './game.types';
import type { SuitColorsType } from '@/utils/gameParams';

const initialState: IGameState = {
  online: true,
  gameId: null,
  title: 'Игра',
  status: 'init',
  stage: 'init',
  params: {
    impostors: 2,
    meetings: 5,
    discussion: 50,
    interval: 30,
  },
  player: {
    id: null,
    alive: true,
    color: 'red',
    lastPosition: {
      x: 0,
      y: 0,
    },
    role: 'impostor',
    score: 0,
  },
  results: {
    result: 'win',
    score: 15,
  },
  startCooldown: 1,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startFastGame: state => { // корректно
      state.status = 'assembling';
    },
    setGameStatus: (state, action: PayloadAction<GameStatusType>) => { // корректно
      state.status = action.payload;
    },
    setCurrentPlayer: (state, action: PayloadAction<IPlayer>) => { // корректно?
      const { id, color, role } = action.payload;
      state.player.id = id;
      state.player.color = color;
      state.player.role = role;
    },
    //
    cancelGame: state => {
      state.status = initialState.status;
      state.stage = initialState.stage;
      state.player.color = initialState.player.color;
    },
    launchGame: state => {
      state.status = 'active';
      state.stage = 'activating';
    },
    playMore: state => {
      state.status = initialState.status;
      state.stage = initialState.stage;
      state.player = initialState.player;
    },
    finishGame: (state) => {
      state.status = 'finished';
    },
    setGameParams: (state, action: PayloadAction<IGameStateParams>) => {
      state.params = action.payload;
    },
    setGameTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOnlineMode: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
    },
    selectColor: (state, action: PayloadAction<keyof SuitColorsType>) => {
      state.player.color = action.payload;
    },
    setPlayerId: (state, action: PayloadAction<number>) => {
      state.player.id = action.payload;
    },
    setGame: (state, action: PayloadAction<IGameWithParams>) => {
      const { id, title, param } = action.payload;
      state.gameId = id;
      state.title = title;
      state.params = param;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;

export const selectOnline = (state: TypeRootState) => state.game.online;
export const selectResults = (state: TypeRootState) => state.game.results;
export const selectPlayer = (state: TypeRootState) => state.game.player;
export const selectGame = (state: TypeRootState) => state.game.gameId;
