import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  leaderboardRatingsAdapter,
  ratingsAdapterInitialState,
} from './ratingEntityAdapter';
import type { PlayerRatingEntity } from '../api/leaderboard/leaderboard.api.types';
import { matchGetRatingsFulfilled } from '../api/leaderboard/leaderboard.api.slice';
import { DEFAULT_RATING_FIELD } from '@-constants/leaderboard/api.constants';
import {
  EnumRatingSListUpdateMethod,
  EnumRatingTypes,
} from '@-constants/leaderboard/ratings.constants';

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
    ratingsListSetAll: (state, action: PayloadAction<PlayerRatingEntity[]>) => {
      leaderboardRatingsAdapter.setAll(state.ratingsList, action.payload);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(matchGetRatingsFulfilled, (state, { payload, meta }) => {
      const { ratingsListUpdateMethod } = meta.arg.originalArgs;
      if (ratingsListUpdateMethod === undefined) {
        return;
      }

      const fetchedRatings = payload.map(ratingData => ratingData.data);
      const { ratingsList } = state;

      if (ratingsListUpdateMethod === EnumRatingSListUpdateMethod.REPLACE) {
        leaderboardRatingsAdapter.setAll(ratingsList, fetchedRatings);
      } else if (
        ratingsListUpdateMethod === EnumRatingSListUpdateMethod.UPSERT
      ) {
        leaderboardRatingsAdapter.upsertMany(ratingsList, fetchedRatings);
      }
    });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
