import { useLazyGetRatingsQuery } from '@/store/api/leaderboard/leaderboard.api-slice';
import { type FC, memo, useCallback, useRef, useEffect } from 'react';
import {
  RATINGS_FETCH_BATCH_SIZE,
  RATINGS_ON_MOUNT_MAX_COUNT,
} from './constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useOnMountRatingsFetching } from './hooks/useOnMountRatingsFetching';
import { useFetchedRatingCount } from './hooks/useFetchedRatingsCount';
import { useUpdateFetchedRatingCount } from './hooks/useUpdateFetchedRatingCount';
import { selectSortingType } from '@/store/leaderboard/selectors';
import { leaderboardActionsDispatcher } from '@/store/leaderboard/leaderboard.dispatcher';

const ShowMoreRatingsButton: FC = () => {
  const sortingType = useTypedSelector(selectSortingType);
  const sortingTypeRef = useRef(sortingType);
  sortingTypeRef.current = sortingType;

  const { currentFetchedRatingsCount, fetchedRatingsCountRef } =
    useFetchedRatingCount();

  useOnMountRatingsFetching({
    currentFetchedRatingsCount: currentFetchedRatingsCount,
    sortingType,
  });

  const [sendGetRatingsQuery, getRatingsQueryStatus] = useLazyGetRatingsQuery();

  const downloadRatingsNextBatch = useCallback(() => {
    sendGetRatingsQuery({
      ratingFieldName: sortingTypeRef.current,
      cursor: 1 + fetchedRatingsCountRef.current,
      limit: RATINGS_FETCH_BATCH_SIZE,
    });
  }, []);

  // useEffect(() => {
  //   leaderboardActionsDispatcher.setFetchedRatingsCount(
  //     currentFetchedRatingsCount
  //   );

  //   return () => {
  //     if (currentFetchedRatingsCount > RATINGS_ON_MOUNT_MAX_COUNT) {
  //       leaderboardActionsDispatcher.setFetchedRatingsCount(
  //         RATINGS_ON_MOUNT_MAX_COUNT
  //       );
  //     }
  //   };
  // }, [currentFetchedRatingsCount]);
  useUpdateFetchedRatingCount(currentFetchedRatingsCount);

  const { isLoading } = getRatingsQueryStatus;
  const buttonLabel = isLoading ? 'Загружаем...' : 'Показать еще';
  return (
    <button
      className="leaderboard__show-more"
      disabled={isLoading}
      onClick={downloadRatingsNextBatch}>
      {buttonLabel}
    </button>
  );
};

export default memo(ShowMoreRatingsButton);
