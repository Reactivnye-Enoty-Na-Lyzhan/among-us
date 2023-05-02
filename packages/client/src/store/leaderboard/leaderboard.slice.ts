import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';
import type { EnumRatingTypes } from '../api/leaderboard/enumerations';
import { matchGetRatingsFulfilled } from '../api/leaderboard/leaderboard.api-slice';
import {
  leaderboardRatingsAdapter,
  ratingsAdapterInitialState,
} from './rating-entity-adapter';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    sortingType: DEFAULT_RATING_FIELD,
    fetchedRatingsCount: 0,
    ratingsList: ratingsAdapterInitialState,
  },
  reducers: {
    setSortingType: (state, action: PayloadAction<EnumRatingTypes>) => {
      state.sortingType = action.payload;
    },
    setFetchedRatingsCount: (state, action: PayloadAction<number>) => {
      state.fetchedRatingsCount = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(matchGetRatingsFulfilled, (state, { payload, meta }) => {
      const fetchedRatings = payload.map(ratingData => ratingData.data);

      const { isPrefetch, needListRecreation } = meta.arg.originalArgs;
      const { ratingsList } = state;

      if (needListRecreation) {
        leaderboardRatingsAdapter.setAll(ratingsList, fetchedRatings);
      } else if (!isPrefetch) {
        leaderboardRatingsAdapter.upsertMany(ratingsList, fetchedRatings);
      }
    });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
