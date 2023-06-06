import type { TypeRootState } from '..';
import { leaderboardRatingsAdapter } from './ratingEntityAdapter';

const ratingsSelectors = leaderboardRatingsAdapter.getSelectors(
  (state: TypeRootState) => state.leaderboard.ratingsList
);

export const selectSortingType = (state: TypeRootState) =>
  state.leaderboard.sortingType;

export const {
  selectAll: selectAllRatings,
  selectTotal: selectRatingsListSize,
} = ratingsSelectors;
