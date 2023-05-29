import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import { ThemeId } from './ui.types';
const THEME_API_PATH = 'theme';
const API_URL = `${API_BASE_URL}${THEME_API_PATH}`;

export const themeApi = createApi({
    reducerPath: 'theme/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',
      }),
      tagTypes: ['Theme'],
    endpoints: build => ({
      getTheme: build.query<{themeId: ThemeId}, void>({
        query: () => '',
        providesTags: ['Theme'],
      }),
      updateTheme: build.mutation<void, {themeId: ThemeId}>({
        query: (data: {themeId: ThemeId}) => ({
            url: '',
            method: 'POST',
            body: data,
          }),
      })
    }),
});

export const { useLazyGetThemeQuery, useUpdateThemeMutation } = themeApi;
