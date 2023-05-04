import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import { RATINGS_ON_MOUNT_MAX_COUNT } from '@-constants/leaderboard/ratings.constants';

export function useUpdateFetchedRatingsCount(
  currentFetchedRatingsCount: number
) {
  const { setFetchedRatingsCount } = useActions();

  useEffect(() => {
    setFetchedRatingsCount(currentFetchedRatingsCount);

    return () => {
      if (currentFetchedRatingsCount > RATINGS_ON_MOUNT_MAX_COUNT) {
        setFetchedRatingsCount(RATINGS_ON_MOUNT_MAX_COUNT);
      }
    };
  }, [currentFetchedRatingsCount]);
}
