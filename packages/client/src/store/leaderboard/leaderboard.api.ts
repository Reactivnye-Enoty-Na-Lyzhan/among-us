import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_TEAM_NAME } from '../../utils/constants';
import { LeaderboardDataType } from './leaderboard.types';

export const leaderboardApi = createApi({
  reducerPath: 'leaderboard/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
