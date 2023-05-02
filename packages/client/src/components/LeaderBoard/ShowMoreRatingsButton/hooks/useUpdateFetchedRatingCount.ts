import { leaderboardActionsDispatcher } from '@/store/leaderboard/leaderboard.dispatcher';
import { useEffect } from 'react';
import { RATINGS_ON_MOUNT_MAX_COUNT } from '../constants';

export function useUpdateFetchedRatingCount(
  currentFetchedRatingsCount: number
) {
  useEffect(() => {
    leaderboardActionsDispatcher.setFetchedRatingsCount(
      currentFetchedRatingsCount
    );

    return () => {
      if (currentFetchedRatingsCount > RATINGS_ON_MOUNT_MAX_COUNT) {
        leaderboardActionsDispatcher.setFetchedRatingsCount(
          RATINGS_ON_MOUNT_MAX_COUNT
        );
      }
    };
  }, [currentFetchedRatingsCount]);
}
