import { useEffect } from 'react';
import { RATINGS_ON_MOUNT_MAX_COUNT } from '../constants';
import { useActions } from '@/hooks/useActions';

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
