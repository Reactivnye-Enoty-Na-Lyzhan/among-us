import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeRootState } from '..';
import type { IApiError, IUiState, ThemeId } from './ui.types';

const initialState: IUiState = {
  isLoading: false,
  themeId: 1,
  apiError: {
    code: null,
    message: null,
  },
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
    setApiError: (state, action: PayloadAction<IApiError>) => {
      const { code, message } = action.payload;
      state.apiError.code = code;
      state.apiError.message = message;
    },
    clearApiError: state => {
      state.apiError = initialState.apiError;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;

export const selectIsLoading = (state: TypeRootState) => state.ui.isLoading;
export const selectThemeId = (state: TypeRootState) => state.ui.themeId;
export const selectApiError = (state: TypeRootState) => state.ui.apiError;
