import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOAuthData } from './auth.types';
import { API_BASE_URL } from '../../utils/constants';

const API_URL = `${API_BASE_URL}`;
interface YandexOAuthResponse {
  isSuccess: boolean;
}

export const oauthApi = createApi({
  reducerPath: 'oauth',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getCode: build.query<{ message: string }, void>({
      query: () => 'code',
    }),
    getToken: build.mutation<YandexOAuthResponse, TOAuthData>({
      query: oauthData => ({
        url: `token`,
        method: 'POST',
        body: oauthData,
      }),
    }),
  }),
});

export const { useLazyGetCodeQuery, useGetTokenMutation } = oauthApi;
