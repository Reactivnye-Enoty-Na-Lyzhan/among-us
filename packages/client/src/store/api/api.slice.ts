import { API_BASE_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSliceBase = createApi({
  reducerPath: 'api',
  tagTypes: ['Rating'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: build => ({}),
});
