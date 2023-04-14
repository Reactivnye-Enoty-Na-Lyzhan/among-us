import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IGameState,
  IGameStateParams,
  ColorType,
  IResults,
} from './game.types';

const initialState: IGameState = {
  online: false,
  title: 'Игра',
  status: 'start',
  stage: 'start',
  params: {
    impostors: 2,
    meetings: 5,
    meetingDuration: 50,
    meetingCooldown: 30,
  },
  player: {
    color: 'white',
  },
  startCooldown: 10,
  results: {
    result: 'lose',
    score: 0,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startFastGame: (state) => {
      state.stage = 'preparing';
      state.results = initialState.results;
    },
    cancelGame: (state) => {
      state.status = initialState.status;
      state.stage = initialState.stage;
      state.player.color = initialState.player.color;
    },
    launchGame: (state) => {
      state.status = 'active';
      state.stage = 'active';
    },
    playMore: (state) => {
      state.status = initialState.status;
      state.stage = initialState.stage;
      state.player = initialState.player;
    },
    updateResults: (state, action: PayloadAction<IResults>) => {
      state.results = action.payload;
    },
    finishGame: (state, action: PayloadAction<IResults>) => {
      state.status = 'finished';
      state.stage = 'finishing';
      state.results = action.payload;
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
    selectColor: (state, action: PayloadAction<ColorType>) => {
      state.player.color = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
