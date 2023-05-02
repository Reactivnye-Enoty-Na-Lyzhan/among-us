import { useEffect } from 'react';
import { RATINGS_FETCH_BATCH_SIZE } from '../constants';
import type { EnumRatingTypes } from '@/store/api/leaderboard/enumerations';
import { usePrefetch } from '@/store/api/leaderboard/leaderboard.api-slice';

type Args = {
  currentFetchedRatingsCount: number;
  sortingType: EnumRatingTypes;
};

export function useOnMountRatingsFetching({
  currentFetchedRatingsCount,
  sortingType,
}: Args) {
  const prefetchRatings = usePrefetch('getRatings');

  useEffect(() => {
    const ratingsToFetchCount = Math.max(
      currentFetchedRatingsCount,
      RATINGS_FETCH_BATCH_SIZE
    );

    prefetchRatings(
      {
        cursor: 0,
        limit: ratingsToFetchCount,
        ratingFieldName: sortingType,
        needListRecreation: true,
      },
      { force: true }
    );
  }, []);
}
