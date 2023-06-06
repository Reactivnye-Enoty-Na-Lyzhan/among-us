import type { TypedStartListening } from '@reduxjs/toolkit';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { AppDispatch, TypeRootState } from '..';
import {
  leaderboardAPISlice,
  matchPostRatingFulfilled,
} from '../api/leaderboard/api.slice';
import { leaderboardActions } from './leaderboard.slice';

const listenerMiddleware = createListenerMiddleware();
export const startListening =
  listenerMiddleware.startListening as TypedStartListening<
    TypeRootState,
    AppDispatch
  >;

startListening({
  matcher: isAnyOf(leaderboardActions.setSortingType, matchPostRatingFulfilled),
  effect: async (action, listenerApi) => {
    let state = listenerApi.getState();
    const { fetchedRatingsCount } = state.leaderboard;
    const sortingType = state.leaderboard.sortingType;

    const getRatingsArgs = {
      offset: 0,
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
    const { isSuccess, data: fetchedRatingsList } = getRatingsRequestState;

    if (isSuccess) {
      listenerApi.dispatch(
        leaderboardActions.ratingsListSetAll(fetchedRatingsList)
      );
    }

    getRatingsRequestResult.unsubscribe();
  },
});

export { listenerMiddleware as leaderboardListenerMiddleware };
