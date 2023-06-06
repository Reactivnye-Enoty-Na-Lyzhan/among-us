import { DEFAULT_RATING_FIELD } from '@-constants/leaderboard/api.constants';
import {
  EnumRatingSListUpdateMethod,
  EnumRatingTypes,
} from '@-constants/leaderboard/ratings.constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { matchGetRatingsFulfilled } from '../api/leaderboard/api.slice';
import {
  leaderboardRatingsAdapter,
  ratingsAdapterInitialState,
} from './ratingEntityAdapter';

import type {
  ILeaderboardState,
  PlayerRatingRecord,
} from './leaderboard.types';

const initialState: ILeaderboardState = {
  sortingType: DEFAULT_RATING_FIELD,
  fetchedRatingsCount: 0,
  ratingsList: ratingsAdapterInitialState,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setSortingType: (state, action: PayloadAction<EnumRatingTypes>) => {
      state.sortingType = action.payload;
    },
    setFetchedRatingsCount: (state, action: PayloadAction<number>) => {
      state.fetchedRatingsCount = action.payload;
    },
    ratingsListSetAll: (state, action: PayloadAction<PlayerRatingRecord[]>) => {
      leaderboardRatingsAdapter.setAll(state.ratingsList, action.payload);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      matchGetRatingsFulfilled,
      (state, { payload: fetchedRatings, meta }) => {
        const { ratingsListUpdateMethod } = meta.arg.originalArgs;
        if (ratingsListUpdateMethod === undefined) {
          return;
        }

        const { ratingsList } = state;
        if (ratingsListUpdateMethod === EnumRatingSListUpdateMethod.REPLACE) {
          leaderboardRatingsAdapter.setAll(ratingsList, fetchedRatings);
        } else if (
          ratingsListUpdateMethod === EnumRatingSListUpdateMethod.UPSERT
        ) {
          leaderboardRatingsAdapter.upsertMany(ratingsList, fetchedRatings);
        }
      }
    );
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
