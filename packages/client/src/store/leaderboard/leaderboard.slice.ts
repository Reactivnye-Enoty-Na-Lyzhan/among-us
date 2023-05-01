import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_RATING_FIELD } from '../api/leaderboard/constants';
import type { EnumRatingTypes } from '../api/leaderboard/enumerations';
import { TypeRootState } from '..';

type SortingTypePayload = {
  sortingType: EnumRatingTypes;
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: { sortingType: DEFAULT_RATING_FIELD },
  reducers: {
    sortingTypeChanged: (state, action: PayloadAction<SortingTypePayload>) => {
      state.sortingType = action.payload.sortingType;
    },
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
export const leaderboardActions = leaderboardSlice.actions;
