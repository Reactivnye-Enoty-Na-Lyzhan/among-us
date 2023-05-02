import { createEntityAdapter } from '@reduxjs/toolkit';
import type { PlayerRatingEntity } from '../api/leaderboard/leaderboard.api.types';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';

const leaderboardRatingsAdapter = createEntityAdapter<PlayerRatingEntity>({
  selectId: ratingEntity => ratingEntity.userLogin,
  sortComparer: (ratingOne, ratingTwo) =>
    ratingTwo[DEFAULT_RATING_FIELD] - ratingOne[DEFAULT_RATING_FIELD],
});

const ratingsAdapterInitialState = leaderboardRatingsAdapter.getInitialState();

export { leaderboardRatingsAdapter, ratingsAdapterInitialState };
