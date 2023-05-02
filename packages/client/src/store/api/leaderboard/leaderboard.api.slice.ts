import { apiSliceBase } from '../api.slice';
import { getRatingsQuery } from './endpoints/getRatings';
import { postRatingQuery } from './endpoints/postRating';
import type {
  GetRatingsRequestArgs,
  GetRatingsSuccessfulResponse,
  PostRatingRequestArgs,
  PostRatingSuccessfulResponse,
} from './leaderboard.api.types';

export const leaderboardAPISlice = apiSliceBase.injectEndpoints({
  endpoints: build => ({
    postRating: build.mutation<
      PostRatingSuccessfulResponse,
      PostRatingRequestArgs
    >({
      invalidatesTags: [{ type: 'Rating', id: 'list' }],
      query: postRatingQuery,
    }),
    getRatings: build.query<
      GetRatingsSuccessfulResponse,
      GetRatingsRequestArgs
    >({
      providesTags: [{ type: 'Rating', id: 'list' }],
      query: getRatingsQuery,
    }),
  }),
});

export const { usePostRatingMutation, useLazyGetRatingsQuery, usePrefetch } =
  leaderboardAPISlice;

export const { matchFulfilled: matchGetRatingsFulfilled } =
  leaderboardAPISlice.endpoints.getRatings;
