import { createListenerMiddleware } from '@reduxjs/toolkit';
import { leaderboardActions } from './leaderboard.slice';
import type { TypeRootState, AppDispatch } from '..';
import type { TypedStartListening } from '@reduxjs/toolkit';
import { leaderboardAPISlice } from '../api/leaderboard/leaderboard.api.slice';

const listenerMiddleware = createListenerMiddleware();
export const startListening =
  listenerMiddleware.startListening as TypedStartListening<
    TypeRootState,
    AppDispatch
  >;

startListening({
  actionCreator: leaderboardActions.setSortingType,
  effect: async (action, listenerApi) => {
    let state = listenerApi.getState();
    const { fetchedRatingsCount } = state.leaderboard;
    const sortingType = action.payload;

    console.log(`MIDDLEWARE: SORTING TYPE -> ${sortingType}`);

    const getRatingsArgs = {
      cursor: 0,
      limit: fetchedRatingsCount,
      ratingFieldName: sortingType,
    };
    const getRatingsRequestAction =
      leaderboardAPISlice.endpoints.getRatings.initiate(getRatingsArgs, {
        forceRefetch: true,
      });
    const getRatingsRequestResult = listenerApi.dispatch(
      getRatingsRequestAction
    );

    const selectGetRatingsState =
      leaderboardAPISlice.endpoints.getRatings.select(getRatingsArgs);
    await listenerApi.condition((_, currentState) => {
      const getRatingsRequestState = selectGetRatingsState(currentState);
      const { isSuccess, isError } = getRatingsRequestState;
      return isSuccess || isError;
    });

    state = listenerApi.getState();
    const getRatingsRequestState = selectGetRatingsState(state);
    const { isSuccess, data } = getRatingsRequestState;
    console.log(`MIDDLEWARE RESULT: ${JSON.stringify(getRatingsRequestState)}`);
    if (isSuccess) {
      const fetchedRatingsList = data.map(ratingData => ratingData.data);
      listenerApi.dispatch(
        leaderboardActions.ratingsListSetAll(fetchedRatingsList)
      );
    }

    getRatingsRequestResult.unsubscribe();
  },
});

export { listenerMiddleware as leaderboardListenerMiddleware };
