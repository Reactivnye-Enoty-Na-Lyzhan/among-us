import type { TypeRootState } from '..';
import { leaderboardRatingsAdapter } from './rating-entity-adapter';

const ratingsSelectors = leaderboardRatingsAdapter.getSelectors(
  (state: TypeRootState) => state.leaderboard.ratingsList
);

export const {
  selectAll: selectAllRatings,
  selectTotal: selectRatingsListSize,
} = ratingsSelectors;
