import { createEntityAdapter } from '@reduxjs/toolkit';
import type { PlayerRatingEntity } from '../api/leaderboard/leaderboard.api.types';

const leaderboardRatingsAdapter = createEntityAdapter<PlayerRatingEntity>({
  selectId: ratingEntity => ratingEntity.userLogin,
});

const ratingsAdapterInitialState = leaderboardRatingsAdapter.getInitialState();

export { leaderboardRatingsAdapter, ratingsAdapterInitialState };
