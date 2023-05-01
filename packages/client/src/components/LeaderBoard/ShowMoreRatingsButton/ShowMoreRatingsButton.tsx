import {
  useLazyGetRatingsQuery,
  usePrefetch,
} from '@/store/api/leaderboard/leaderboard.api-slice';
import { useState, type FC, memo, useEffect } from 'react';
import { RATINGS_ON_MOUNT_MAX_COUNT } from './constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSelector } from 'react-redux';
import { selectRatingsListSize } from '@/store/leaderboard/selectors';
import { leaderboardActionsDispatcher } from '@/store/leaderboard/leaderboard.dispatcher';
import { useOnMountRatingsFetching } from './hooks/useOnMountRatingsFetching';

const ShowMoreRatingsButton: FC = () => {
  const sortingType = useTypedSelector(state => state.leaderboard.sortingType);
  const fetchedRatingsCount = useSelector(selectRatingsListSize);
  // const [sendGetRatingsQuery, getRatingsQueryStatus] = useLazyGetRatingsQuery();

  const prefetchRatings = usePrefetch('getRatings');

  useOnMountRatingsFetching({
    currentFetchedRatingsCount: fetchedRatingsCount,
    sortingType,
    prefetchFunction: prefetchRatings,
  });

  useEffect(() => {
    leaderboardActionsDispatcher.setFetchedRatingsCount({
      fetchedRatingsCount,
    });

    return () => {
      if (fetchedRatingsCount > RATINGS_ON_MOUNT_MAX_COUNT) {
        leaderboardActionsDispatcher.setFetchedRatingsCount({
          fetchedRatingsCount: RATINGS_ON_MOUNT_MAX_COUNT,
        });
      }
    };
  }, [fetchedRatingsCount]);

  return <button className="leaderboard__show-more">Показать еще</button>;
};

export default memo(ShowMoreRatingsButton);
