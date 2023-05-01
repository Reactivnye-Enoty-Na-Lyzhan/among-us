import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TOAuthData,
  TServiceId
} from './auth.types';
import { API_BASE_URL, OAUTH_API_PATH, } from '../../utils/constants';
import { getRedirectUrl } from '../../utils/oauth/getRedirectUrl';

const API_URL = `${API_BASE_URL}${OAUTH_API_PATH}`;

export const oauthApi = createApi({
  reducerPath: 'oauth',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getServiceId: build.query<TServiceId, void>({
      query: () => ({
        url: `${API_URL}yandex/service-id`,
        method: 'GET',
        credentials: 'include',
        params: { redirect_uri: getRedirectUrl() },
      }),
    }),
    yandexOAuth: build.mutation<string, TOAuthData>({
      query: oauthData => ({ url: `${API_URL}yandex`, method: 'POST', body: oauthData, responseHandler: 'text' }),
    }),
  }),
});


export const { useLazyGetServiceIdQuery, useYandexOAuthMutation } = oauthApi;

