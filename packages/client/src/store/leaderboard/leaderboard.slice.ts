import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';
import type { EnumRatingTypes } from '../api/leaderboard/enumerations';
import { matchGetRatingsFulfilled } from '../api/leaderboard/leaderboard.slice';
import {
  leaderboardRatingsAdapter,
  ratingsAdapterState,
} from './rating-entity-adapter';

type SortingTypePayload = {
  sortingType: EnumRatingTypes;
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    sortingType: DEFAULT_RATING_FIELD,
    ratingsList: ratingsAdapterState,
  },
  reducers: {
    setSortingType: (state, action: PayloadAction<SortingTypePayload>) => {
      state.sortingType = action.payload.sortingType;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(matchGetRatingsFulfilled, (state, { payload }) => {
      console.log('MATCHER');
      const ratingsData = payload.map(ratingData => ratingData.data);
      state.ratingsList = leaderboardRatingsAdapter.upsertMany(
        ratingsAdapterState,
        ratingsData
      );
    });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
