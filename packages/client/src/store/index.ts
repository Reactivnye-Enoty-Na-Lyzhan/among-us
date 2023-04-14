import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game/game.slice';
import { leaderboardApi } from './leaderboard/leaderboard.api';

export const store = configureStore({
  reducer: {
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(leaderboardApi.middleware),
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
