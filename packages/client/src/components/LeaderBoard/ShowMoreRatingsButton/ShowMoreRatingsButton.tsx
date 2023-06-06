import { type FC, memo, useEffect } from 'react';
import { useUpdateFetchedRatingsCount } from './hooks/useUpdateFetchedRatingsCount';
import { selectRatingsListSize } from '@/store/leaderboard/selectors';
import { useFetchRatingsNextBatch } from './hooks/useFetchRatingsNextBatch';
import { useSelector } from 'react-redux';
import {
  EnumRatingSListUpdateMethod,
  RATINGS_FETCH_BATCH_SIZE,
} from '@-constants/leaderboard/ratings.constants';

const ShowMoreRatingsButton: FC = () => {
  const currentFetchedRatingsCount = useSelector(selectRatingsListSize);
  const { fetchRatingsNextBatch, fetchRatingsBatchQueryState } =
    useFetchRatingsNextBatch(currentFetchedRatingsCount);

  useEffect(() => {
    const firstFetchBatchSize = Math.max(
      currentFetchedRatingsCount,
      RATINGS_FETCH_BATCH_SIZE
    );

    fetchRatingsNextBatch({
      offset: 0,
      limit: firstFetchBatchSize,
      ratingsListUpdateMethod: EnumRatingSListUpdateMethod.REPLACE,
    });
  }, []);

  useUpdateFetchedRatingsCount(currentFetchedRatingsCount);

  const { isLoading } = fetchRatingsBatchQueryState;
  const buttonLabel = isLoading ? 'Загружаем...' : 'Показать еще';
  return (
    <button
      className="leaderboard__show-more"
      disabled={isLoading}
      onClick={() => fetchRatingsNextBatch()}>
      {buttonLabel}
    </button>
  );
};

export default memo(ShowMoreRatingsButton);
