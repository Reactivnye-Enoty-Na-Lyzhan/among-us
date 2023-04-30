import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game/game.slice';
import { authApi } from './auth/auth.slice';
import { uiReducer } from './ui/ui.slice';
import { apiSliceBase } from './api/api.slice';

export const store = configureStore({
  reducer: {
    [apiSliceBase.reducerPath]: apiSliceBase.reducer,
    [authApi.reducerPath]: authApi.reducer,
    game: gameReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSliceBase.middleware, authApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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
