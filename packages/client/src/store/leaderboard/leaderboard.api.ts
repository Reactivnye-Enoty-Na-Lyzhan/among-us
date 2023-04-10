import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_TEAM_NAME } from '../../utils/constants';
import { LeaderboardDataType } from './leaderboard.types';

export const leaderboardApi = createApi({
  reducerPath: 'leaderboard/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/',
    credentials: 'include',
  }),
  endpoints: build => ({
    getLeaderboardData: build.query<
      LeaderboardDataType[],
      { limit: number; cursor: number }
    >({
      query: ({ limit, cursor }) => ({
        url: `leaderboard/${API_TEAM_NAME}`,
        method: 'POST',
        body: {
          ratingFieldName: 'nickname',
          cursor,
          limit,
        },
      }),
    }),
  }),
});

export const { useGetLeaderboardDataQuery } = leaderboardApi;
