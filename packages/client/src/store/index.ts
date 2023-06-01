import { configureStore } from '@reduxjs/toolkit';
import { apiSliceBase } from './api/api.slice';
import { authApi } from './auth/auth.slice';
import { oauthApi } from './auth/oauth.slice';
import { forumApi } from './forum/forum.api';
import { gameApi } from './game/game.api';
import { gameReducer } from './game/game.slice';
import { IGameState } from './game/game.types';
import { leaderboardReducer } from './leaderboard/leaderboard.slice';
import { ILeaderboardState } from './leaderboard/leaderboard.types';
import { leaderboardListenerMiddleware } from './leaderboard/listenerMiddleware';
import { themeApi } from './ui/ui.api';
import { uiReducer } from './ui/ui.slice';
import { IUiState } from './ui/ui.types';

export const createStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: {
      [apiSliceBase.reducerPath]: apiSliceBase.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [oauthApi.reducerPath]: oauthApi.reducer,
      [gameApi.reducerPath]: gameApi.reducer,
      [forumApi.reducerPath]: forumApi.reducer,
      [themeApi.reducerPath]: themeApi.reducer,
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
        gameApi.middleware,
        themeApi.middleware,
        forumApi.middleware
      ),
  });
};

export type PreloadedState = {
  game: IGameState;
  ui: IUiState;
  leaderboard: ILeaderboardState;
};

export type TypeRootState = ReturnType<
  ReturnType<typeof createStore>['getState']
>;
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
