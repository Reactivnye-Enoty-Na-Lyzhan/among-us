import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/utils/constants';
import type {
  ICurentGame,
  IFindGameRequest,
  IFindGameResponse,
  IGameCreateRequest,
  IGameCreateResponse,
  IGetGamesRequest,
  IGetGamesResponse,
  IHotGame,
  IJoinGameRequest,
  IJoinGameResponse,
  ILeaveGameRequest,
  ILeaveGameResponse,
  ITakeQueueRequest,
  ITakeQueueResponse,
  IUpdateScoreRequest,
  IUpdateScoreResponse,
} from './game.types';

export const gameApi = createApi({
  reducerPath: 'game/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/game`,
    credentials: 'include',
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ['CurrentGame', 'Games', 'FoundGame'],
  endpoints: build => ({
    findHotGame: build.query<IHotGame, unknown>({
      query: () => '/hot',
    }),
    getCurrentGame: build.query<ICurentGame, void>({
      query: () => '/current',
      providesTags: ['CurrentGame'],
    }),
    getGames: build.mutation<IGetGamesResponse, IGetGamesRequest>({
      query: data => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    findGame: build.mutation<IFindGameResponse, IFindGameRequest>({
      query: data => ({
        url: '/find',
        method: 'POST',
        body: data,
      }),
    }),
    takeQueue: build.mutation<ITakeQueueResponse, ITakeQueueRequest>({
      query: data => ({
        url: '/queue',
        method: 'POST',
        body: data,
      }),
    }),
    joinGame: build.mutation<IJoinGameResponse, IJoinGameRequest>({
      query: data => ({
        url: '/join',
        method: 'POST',
        body: data,
      }),
    }),
    createGame: build.mutation<IGameCreateResponse, IGameCreateRequest>({
      query: data => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Games'], // добавить новую игру в этот список?
    }),
    leaveGame: build.mutation<ILeaveGameResponse, ILeaveGameRequest>({
      query: data => ({
        url: '/leave',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['CurrentGame'],
    }),
    updateScore: build.mutation<IUpdateScoreResponse, IUpdateScoreRequest>({
      query: data => ({
        url: '/score',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useFindHotGameQuery,
  useGetCurrentGameQuery,
  useGetGamesMutation,
  useFindGameMutation,
  useTakeQueueMutation,
  useJoinGameMutation,
  useCreateGameMutation,
  useLeaveGameMutation,
  useUpdateScoreMutation,
} = gameApi;
