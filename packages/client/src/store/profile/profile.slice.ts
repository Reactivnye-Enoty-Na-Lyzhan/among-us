import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../auth/auth.types';
import { API_BASE_URL } from '../../utils/constants';

const PROFILE_API_PATH = 'user';
const API_URL = `${API_BASE_URL}${PROFILE_API_PATH}`;

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (data: Partial<User>) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updateAvatar: build.mutation<User, FormData>({
      query: (data: FormData) => ( {
        url: '/profile/avatar',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} = authApi;
