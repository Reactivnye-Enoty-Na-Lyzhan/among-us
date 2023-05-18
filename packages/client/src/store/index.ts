import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game/game.slice';
import { authApi } from './auth/auth.slice';
import { oauthApi } from './auth/oauth.slice';
import { uiReducer } from './ui/ui.slice';
import { apiSliceBase } from './api/api.slice';
import { leaderboardReducer } from './leaderboard/leaderboard.slice';
import { leaderboardListenerMiddleware } from './leaderboard/listenerMiddleware';
import { IGameState } from './game/game.types';
import { IUiState } from './ui/ui.types';
import { ILeaderboardState } from './leaderboard/leaderboard.types';

export const createStore = (preloadedState?: TypeRootState) => {
  return configureStore({
    reducer: {
      [apiSliceBase.reducerPath]: apiSliceBase.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [oauthApi.reducerPath]: oauthApi.reducer,
      game: gameReducer,
      ui: uiReducer,
      leaderboard: leaderboardReducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        apiSliceBase.middleware,
        authApi.middleware,
        oauthApi.middleware,
        leaderboardListenerMiddleware.middleware,
      ),
  });
};

export type TypeRootState = {
  api: any;
  game: IGameState;
  ui: IUiState;
  leaderboard: ILeaderboardState;
};
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

/*
  ************* HOW TO USE: ****************

  const { isLoading, isError, data } = useGetLeaderboardDataQuery({
    limit: 10,
    cursor: 0,
  });

  const { setGameTitle } = useActions();

  const { game } = useTypedSelector(state => state);

  console.log(game);

  setGameTitle('asd');

  console.log({ data });
*/
