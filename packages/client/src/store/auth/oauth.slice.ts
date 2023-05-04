import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOAuthData, TServiceId } from './auth.types';
import { API_BASE_URL, OAUTH_API_PATH } from '../../utils/constants';
import { getRedirectUrl } from '../../utils/oauth/getRedirectUrl';

const API_URL = `${API_BASE_URL}${OAUTH_API_PATH}`;
interface YandexOAuthResponse {
  isSuccess: boolean;
}

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
    yandexOAuth: build.mutation<YandexOAuthResponse, TOAuthData>({
      query: oauthData => ({
        url: `${API_URL}yandex`,
        method: 'POST',
        body: oauthData,
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

export const { useLazyGetServiceIdQuery, useYandexOAuthMutation } = oauthApi;
