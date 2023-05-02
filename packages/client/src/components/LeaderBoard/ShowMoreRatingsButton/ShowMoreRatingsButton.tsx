import { useLazyGetRatingsQuery } from '@/store/api/leaderboard/leaderboard.api.slice';
import { type FC, memo, useCallback, useRef } from 'react';
import { RATINGS_FETCH_BATCH_SIZE } from './constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useOnMountRatingsFetching } from '../hooks/useOnMountRatingsFetching';
import { useFetchedRatingCount } from '../hooks/useFetchedRatingsCount';
import { useUpdateFetchedRatingsCount } from '../hooks/useUpdateFetchedRatingsCount';
import { selectSortingType } from '@/store/leaderboard/selectors';

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
      cursor: fetchedRatingsCountRef.current,
      limit: RATINGS_FETCH_BATCH_SIZE,
    });
  }, []);

  useUpdateFetchedRatingsCount(currentFetchedRatingsCount);

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
