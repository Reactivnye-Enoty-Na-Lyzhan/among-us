import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';
import type { EnumRatingTypes } from '../api/leaderboard/enumerations';
import { matchGetRatingsFulfilled } from '../api/leaderboard/leaderboard.api-slice';
import {
  leaderboardRatingsAdapter,
  ratingsAdapterState,
} from './rating-entity-adapter';

type SortingTypePayload = {
  sortingType: EnumRatingTypes;
};

type fetchedRatingsCountPayload = {
  fetchedRatingsCount: number;
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    sortingType: DEFAULT_RATING_FIELD,
    fetchedRatingsCount: 0,
    ratingsList: ratingsAdapterState,
  },
  reducers: {
    setSortingType: (state, action: PayloadAction<SortingTypePayload>) => {
      state.sortingType = action.payload.sortingType;
    },
    setFetchedRatingsCount: (
      state,
      action: PayloadAction<fetchedRatingsCountPayload>
    ) => {
      state.fetchedRatingsCount = action.payload.fetchedRatingsCount;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(matchGetRatingsFulfilled, (state, { payload, meta }) => {
      console.log(`MATCHER ARGS: ${JSON.stringify(meta.arg)}`);
      const ratingsData = payload.map(ratingData => ratingData.data);
      console.log(`RATINGS UPSERT: ${JSON.stringify(ratingsData)}`);
      const ratingsList = leaderboardRatingsAdapter.upsertMany(
        ratingsAdapterState,
        ratingsData
      );
      console.log(`RATINGS LIST ${JSON.stringify(ratingsList)}`);
      state.ratingsList = ratingsList;
    });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
