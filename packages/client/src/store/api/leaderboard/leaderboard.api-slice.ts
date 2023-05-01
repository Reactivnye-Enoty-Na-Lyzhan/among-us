import { apiSliceBase } from '../api.slice';

import {
  type PostRatingRequestArgs,
  type PostRatingSuccessfulResponse,
  postRatingQuery,
} from './endpoints/post-rating';
import {
  type GetRatingsRequestArgs,
  type GetRatingsSuccessfulResponse,
  getRatingsQuery,
} from './endpoints/get-ratings';

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
