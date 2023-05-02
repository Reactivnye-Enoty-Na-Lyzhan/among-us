import { createSelector } from '@reduxjs/toolkit';
import type { TypeRootState } from '..';
import { leaderboardRatingsAdapter } from './ratingEntityAdapter';
import type { EnumRatingTypes } from '../api/leaderboard/constants';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';

const ratingsSelectors = leaderboardRatingsAdapter.getSelectors(
  (state: TypeRootState) => state.leaderboard.ratingsList
);

export const selectSortingType = (state: TypeRootState) =>
  state.leaderboard.sortingType;

export const selectAllRatingsSorted = createSelector(
  [
    ratingsSelectors.selectAll,
    (_, sortingType: EnumRatingTypes) => sortingType,
  ],
  (ratingsList, sortingType) => {
    if (sortingType === DEFAULT_RATING_FIELD) {
      return ratingsList;
    }

    return [...ratingsList].sort(
      (ratingOne, ratingTwo) => ratingTwo[sortingType] - ratingOne[sortingType]
    );
  }
);

export const {
  selectAll: selectAllRatings,
  selectTotal: selectRatingsListSize,
} = ratingsSelectors;
