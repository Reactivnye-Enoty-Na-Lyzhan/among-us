import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameState, IGameStateParams } from './game.types';

const initialState: IGameState = {
  title: 'Новая игра',
  params: {
    imposters: 1,
    emergencyMeetings: 2,
    votingTime: 60,
    emergencyCountdown: 20,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameParams: (state, action: PayloadAction<IGameStateParams>) => {
      state.params = action.payload;
    },
    setGameTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
