import { createEntityAdapter } from '@reduxjs/toolkit';
import { PlayerRatingRecord } from './leaderboard.types';

const leaderboardRatingsAdapter = createEntityAdapter<PlayerRatingRecord>({
  selectId: ratingEntity => ratingEntity.userLogin,
});

const ratingsAdapterInitialState = leaderboardRatingsAdapter.getInitialState();

export { leaderboardRatingsAdapter, ratingsAdapterInitialState };
