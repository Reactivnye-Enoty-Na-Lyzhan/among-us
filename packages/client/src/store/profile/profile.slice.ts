import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import type { PasswordChange, User } from '../auth/auth.types';
import type { IAvatarResponse } from './profile.types';

const PROFILE_API_PATH = 'user';
const API_URL = `${API_BASE_URL}${PROFILE_API_PATH}`;

export const profileApi = createApi({
  reducerPath: 'profile/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    updateUser: build.mutation<User, Partial<User>>({
      query: data => ({
        url: '/profile',
        method: 'PATCH',
        body: data,
      }),
    }),
    changePassword: build.mutation<void, PasswordChange>({
      query: data => ({
        url: '/password',
        method: 'PATCH',
        body: data,
      }),
    }),
    changeAvatar: build.mutation<IAvatarResponse, FormData>({
      query: data => ({
        url: '/avatar',
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useChangePasswordMutation,
  useChangeAvatarMutation,
} = profileApi;
