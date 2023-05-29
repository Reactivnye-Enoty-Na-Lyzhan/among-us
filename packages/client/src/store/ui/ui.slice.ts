import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeRootState } from '..';
import { IUiState, ThemeId } from './ui.types';


const initialState: IUiState = {
  isLoading: false,
  themeId: 1,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setThemeId: (state, action: PayloadAction<ThemeId>) => {
      state.themeId = action.payload;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;

export const selectIsLoading = (state: TypeRootState) => state.ui.isLoading;
export const selectThemeId = (state: TypeRootState) => state.ui.themeId;
