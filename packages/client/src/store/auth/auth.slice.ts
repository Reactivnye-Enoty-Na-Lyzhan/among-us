import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpRequestData, SignUpRequestResponse, User } from './auth.types';
import { API_BASE_URL } from '../../utils/constants';

const AUTH_API_PATH = 'auth';
const API_URL = `${API_BASE_URL}${AUTH_API_PATH}`;

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => '/user',
    }),
    signupUser: build.mutation<SignUpRequestResponse, SignUpRequestData>({
      query: data => ({ url: '/signup', method: 'POST', body: data }),
    }),
  }),
});

export const { useGetUserQuery, useSignupUserMutation } = authApi;
