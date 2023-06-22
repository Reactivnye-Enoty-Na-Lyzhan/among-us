import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import {
  SignInRequestDTO,
  SignInSuccessfulResponse,
  SignUpRequestDTO,
  SignUpSuccessfulResponse,
  User,
} from './auth.types';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<User, void | string>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    signUpUser: build.mutation<SignUpSuccessfulResponse, SignUpRequestDTO>({
      query: data => ({ url: '/signup', method: 'POST', body: data }),
    }),
    signInUser: build.mutation<SignInSuccessfulResponse, SignInRequestDTO>({
      query: data => ({
        url: '/signin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['User']),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useLogoutMutation,
} = authApi;
