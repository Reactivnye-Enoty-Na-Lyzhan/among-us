import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './auth.types';
import { API_BASE_URL } from '../../utils/constants';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => '/auth/user',
    }),
  }),
});

export const { useGetUserQuery } = authApi;
