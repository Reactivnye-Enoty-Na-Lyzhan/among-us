import { useEffect } from 'react';
import { RATINGS_FETCH_BATCH_SIZE } from '../constants';
import type { EnumRatingTypes } from '@/store/api/leaderboard/enumerations';
import type { GetRatingsRequestArgs } from '@/store/api/leaderboard/endpoints/get-ratings';
import type { PrefetchOptions } from '@reduxjs/toolkit/dist/query/core/module';

type Args = {
  currentFetchedRatingsCount: number;
  sortingType: EnumRatingTypes;
  prefetchFunction: (
    args: GetRatingsRequestArgs,
    options?: PrefetchOptions
  ) => void;
};

export function useOnMountRatingsFetching({
  currentFetchedRatingsCount,
  sortingType,
  prefetchFunction,
}: Args) {
  useEffect(() => {
    const ratingsToFetchCount = Math.max(
      currentFetchedRatingsCount,
      RATINGS_FETCH_BATCH_SIZE
    );

    prefetchFunction(
      {
        cursor: 0,
        limit: ratingsToFetchCount,
        ratingFieldName: sortingType,
      },
      { force: true }
    );

    prefetchFunction(
      {
        cursor: ratingsToFetchCount,
        limit: ratingsToFetchCount + RATINGS_FETCH_BATCH_SIZE,
        ratingFieldName: sortingType,
      },
      { force: true }
    );
  }, []);
}
