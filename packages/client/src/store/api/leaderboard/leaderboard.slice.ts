import { API_TEAM_NAME } from '@/utils/constants';
import {
  PlayerRatingEntity,
  PostRatingRequestDTO,
  PostRatingSuccessfulResponse,
  PostRatingRequestArgs,
  EnumRatingEntityIdentifiers,
  GetRatingsRequestArgs,
  DEFAULT_RATING_FIELD,
} from './leaderboard.types';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { jsonOtherwiseTextHandler } from '@/utils/api/response-handlers';
import { apiSliceBase } from '../api.slice';

const API_PATH = 'leaderboard';
const TEAM_NAME = `${API_TEAM_NAME}Experimental `;

const playersAdapter = createEntityAdapter<PlayerRatingEntity>({
  sortComparer: (playerOne, playerTwo) => playerOne.rank - playerTwo.rank,
});

playersAdapter.getSelectors;

export const leaderboardSlice = apiSliceBase.injectEndpoints({
  endpoints: build => ({
    postRating: build.mutation<
      PostRatingSuccessfulResponse,
      PostRatingRequestArgs
    >({
      invalidatesTags: [{ type: 'Rating', id: 'list' }],
      query: ratingData => {
        const requestDTO: PostRatingRequestDTO = {
          data: {
            ...ratingData,
          },
          ratingFieldName: EnumRatingEntityIdentifiers.RATING_ID,
          teamName: TEAM_NAME,
        };

        return {
          url: API_PATH,
          method: 'POST',
          body: requestDTO,
          responseHandler: jsonOtherwiseTextHandler,
        };
      },
    }),
    getRatings: build.query<PlayerRatingEntity[], GetRatingsRequestArgs>({
      providesTags: [{ type: 'Rating', id: 'list' }],
      query: ({ limit, cursor, ratingFieldName = DEFAULT_RATING_FIELD }) => ({
        url: `${API_PATH}/${TEAM_NAME}`,
        method: 'POST',
        body: {
          ratingFieldName,
          cursor,
          limit,
        },
      }),
    }),
  }),
});

export const { usePostRatingMutation, useGetRatingsQuery } = leaderboardSlice;
