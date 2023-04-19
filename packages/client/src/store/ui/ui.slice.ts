import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeRootState } from "..";
import { IUiState } from "./ui.types";

const initialState: IUiState = {
  isLoading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;

export const selectIsLoading = (state: TypeRootState) => state.ui.isLoading;
