import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TOAuthData,
  TServiceId,
} from './auth.types';
import { API_BASE_URL, OAUTH_API_PATH } from '../../utils/constants';

const API_URL = `${API_BASE_URL}${OAUTH_API_PATH}`;

export const REDIRECT_URL = new URL('http://localhost:3000/signin').toString();

export const redirectToOAuthYandex = (serviceId: string) => {
  const url = new URL('https://oauth.yandex.ru/authorize');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: serviceId,
    redirect_uri: REDIRECT_URL,
  });

  window.location.href = `${url}?${params}`;
};

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
        params: { redirect_uri: REDIRECT_URL },
      }),
    }),
    yandexOAuth: build.mutation<string, TOAuthData>({
      query: oauthData => ({ url: `${API_URL}yandex`, method: 'POST', body: oauthData, responseHandler: 'text' }),
    }),
  }),
});


export const { useLazyGetServiceIdQuery, useYandexOAuthMutation } = oauthApi;

