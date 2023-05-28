import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  User,
  SignInRequestDTO,
  SignInSuccessfulResponse,
  SignUpRequestDTO,
  SignUpSuccessfulResponse,
} from './auth.types';
import { API_BASE_URL } from '../../utils/constants';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    signUpUser: build.mutation<SignUpSuccessfulResponse, SignUpRequestDTO>({
      query: data => ({ url: '/signup', method: 'POST', body: data }),
      invalidatesTags: ['User'],
    }),
    signInUser: build.mutation<SignInSuccessfulResponse, SignInRequestDTO>({
      query: data => ({
        url: '/signin',
        method: 'POST',
        body: data,
        responseHandler: response => {
          const isJson = response.headers
            .get('Content-Type')
            ?.includes('application/json');
          return isJson ? response.json() : response.text();
        },
        invalidatesTags: ['User'],
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
} = authApi;
