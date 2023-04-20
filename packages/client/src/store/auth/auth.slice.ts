import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInSuccessfulResponse, User } from './auth.types';
import { API_BASE_URL } from '../../utils/constants';
import {
  SignUpRequestDTO,
  SignInRequestDTO,
  SignUpSuccessfulResponse,
} from '@/store/auth/auth.types';

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
    signUpUser: build.mutation<SignUpSuccessfulResponse, SignUpRequestDTO>({
      query: data => ({ url: '/signup', method: 'POST', body: data }),
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
