import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TypeRootState } from '..';
import type {
  IGameState,
  GameStatusType,
  IPlayer,
  IGameWithParams,
  PlayerRoleType,
  IPlayerWithUser,
  IStartMeeting,
} from './game.types';

const initialState: IGameState = {
  online: true,
  gameId: null,
  title: '',
  status: 'init',
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
  playersAmount: 0,
  players: [],
  results: {
    winners: null,
  },
  chatId: null,
  startCooldown: 15,
  meetings: {
    initiator: null,
    isProccessing: false,
    count: 0,
    lastMeeting: null,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startFastGame: state => {
      state.status = 'assembling';
    },
    setGameStatus: (state, action: PayloadAction<GameStatusType>) => {
      state.status = action.payload;
    },
    setCurrentPlayer: (state, action: PayloadAction<IPlayer>) => {
      const { id, color, role } = action.payload;
      state.player.id = id;
      state.player.color = color;
      state.player.role = role;
    },
    addPlayerToList: state => {
      state.playersAmount += 1;
    },
    setPlayersAmount: (state, action: PayloadAction<number>) => {
      state.playersAmount = action.payload;
    },
    removePlayerFromList: state => {
      state.playersAmount -= 1;
    },
    setGamePlayers: (state, action: PayloadAction<IPlayerWithUser[]>) => {
      state.players = action.payload;
    },
    killPlayer: (state, action: PayloadAction<IPlayer['id']>) => {
      const player = state.players.find(player => player.id === action.payload);
      if (!player) return;

      player.alive = false;
    },
    finishGame: (state, action: PayloadAction<PlayerRoleType>) => {
      state.status = 'finished';
      state.results.winners = action.payload;
      state.player = initialState.player;
      state.playersAmount = 0;
      state.results = initialState.results;
      state.players = initialState.players;
      state.chatId = initialState.chatId;
      state.meetings = initialState.meetings;
    },
    cancelGame: state => {
      state.status = initialState.status;
      state.player = initialState.player;
      state.playersAmount = 0;
      state.results = initialState.results;
      state.players = initialState.players;
      state.chatId = initialState.chatId;
      state.meetings = initialState.meetings;
    },
    launchGame: state => {
      state.status = 'active';
    },
    playMore: state => {
      state.status = initialState.status;
    },
    setGame: (state, action: PayloadAction<IGameWithParams>) => {
      const { id, title, param, chat } = action.payload;
      state.gameId = id;
      state.title = title;
      state.params = param;
      state.chatId = chat.id;
    },
    startMeeting: (state, action: PayloadAction<IStartMeeting>) => {
      state.meetings.initiator = action.payload;
      state.meetings.isProccessing = true;
    },
    stopMeeting: state => {
      state.meetings.isProccessing = initialState.meetings.isProccessing;
      state.meetings.initiator = initialState.meetings.initiator;
      state.meetings.count += 1;
      state.meetings.lastMeeting = performance.now();
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;

export const selectOnline = (state: TypeRootState) => state.game.online;
export const selectResults = (state: TypeRootState) => state.game.results;
export const selectPlayer = (state: TypeRootState) => state.game.player;
export const selectPlayers = (state: TypeRootState) => state.game.players;
export const selectPlayersAmount = (state: TypeRootState) =>
  state.game.playersAmount;
export const selectGame = (state: TypeRootState) => state.game.gameId;
export const selectChatId = (state: TypeRootState) => state.game.chatId;
export const selectMeeting = (state: TypeRootState) => state.game.meetings;
