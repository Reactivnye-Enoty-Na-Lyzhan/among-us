import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';
import type { EnumRatingTypes } from '../api/leaderboard/enumerations';
import type { PlayerRatingEntity } from '../api/leaderboard/leaderboard.types';
import type { GetRatingsSuccessfulResponse } from '../api/leaderboard/endpoints/get-ratings';
import { TypeRootState } from '..';

const leaderboardRatingsAdapter = createEntityAdapter<PlayerRatingEntity>({
  selectId: ratingEntity => ratingEntity.userLogin,
});
const ratingsAdapterState = leaderboardRatingsAdapter.getInitialState();

type SortingTypePayload = {
  sortingType: EnumRatingTypes;
};

type RatingsDataPayload = {
  ratingsData: GetRatingsSuccessfulResponse;
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
    upsertRatings: (state, action: PayloadAction<RatingsDataPayload>) => {
      const payloadData = action.payload.ratingsData;
      const ratingsData = payloadData.map(ratingData => ratingData.data);

      leaderboardRatingsAdapter.upsertMany(ratingsAdapterState, ratingsData);
    },
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;

const ratingsSelectors = leaderboardRatingsAdapter.getSelectors(
  (state: TypeRootState) => state.leaderboard.ratingsList
);
export const { selectAll: selectAllRatings } = ratingsSelectors;
