import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game/game.slice';
import { leaderboardApi } from './leaderboard/leaderboard.api';
import { authApi } from './auth/auth.slice';
import { oauthApi } from './auth/oauth.slice';
import { uiReducer } from './ui/ui.slice';
import { IGameState } from './game/game.types';
import { IUiState } from './ui/ui.types';

export const createStore = (preloadedState?: TypeRootState) => {
  return configureStore({
    reducer: {
      [leaderboardApi.reducerPath]: leaderboardApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [oauthApi.reducerPath]: oauthApi.reducer,
    game: gameReducer,
      ui: uiReducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        leaderboardApi.middleware,
        authApi.middleware,
      oauthApi.middleware
      ),
  });
};

export type TypeRootState = {
  game: IGameState;
  ui: IUiState;
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
