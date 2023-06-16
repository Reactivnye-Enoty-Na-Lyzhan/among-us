export type ThemeId = 1 | 2 | 3;

export interface IUiState {
  isLoading: boolean;
  themeId: ThemeId;
  apiError: IApiError;
}

export interface IApiError {
  code: number | null;
  message: string | null;
}
