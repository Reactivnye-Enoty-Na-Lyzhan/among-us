import { apiSliceBase } from '../api.slice-base';
import { injectGetRatingsEndpoint } from './endpoints/getRatings';
import { injectPostRatingEndpoint } from './endpoints/postRating';

const extendedWithPostRating = injectPostRatingEndpoint(apiSliceBase);
const extendedWithGetRatings = injectGetRatingsEndpoint(extendedWithPostRating);

export const leaderboardAPISlice = extendedWithGetRatings;

export const { usePostRatingMutation, useLazyGetRatingsQuery } =
  leaderboardAPISlice;
export const { matchFulfilled: matchGetRatingsFulfilled } =
  leaderboardAPISlice.endpoints.getRatings;
export const { matchFulfilled: matchPostRatingFulfilled } =
  leaderboardAPISlice.endpoints.postRating;
