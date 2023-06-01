import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Временно старый api для лидерборда
// TODO
const YANDEX_API_URL = 'https://ya-praktikum.tech/api/v2/';

export const apiSliceBase = createApi({
  reducerPath: 'api',
  tagTypes: ['Rating'],
  baseQuery: fetchBaseQuery({
    baseUrl: YANDEX_API_URL,
    credentials: 'include',
  }),
  endpoints: build => ({}),
});
