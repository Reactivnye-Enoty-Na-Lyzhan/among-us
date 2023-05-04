import { useLazyGetRatingsQuery } from '@/store/api/leaderboard/leaderboard.api.slice';
import { selectSortingType } from '@/store/leaderboard/selectors';
import { useSelector } from 'react-redux';
import { GetRatingsRequestArgs } from '@/store/api/leaderboard/leaderboard.api.types';
import { OmitKeys } from '@/utils/objects-handle/types/omitKeys';
import { Optional } from '@/utils/objects-handle/types/optional';
import {
  EnumRatingSListUpdateMethod,
  RATINGS_FETCH_BATCH_SIZE,
} from '@-constants/leaderboard/ratings.constants';

type FetchFunctionArgs = Optional<
  OmitKeys<GetRatingsRequestArgs, 'ratingFieldName'>,
  'cursor'
>;

const fetchFunctionDefaultArgs = {
  limit: RATINGS_FETCH_BATCH_SIZE,
  ratingsListUpdateMethod: EnumRatingSListUpdateMethod.UPSERT,
};

export function useFetchRatingsNextBatch(currentFetchedRatingsCount: number) {
  const [sendGetRatingsQuery, getRatingsQueryState] = useLazyGetRatingsQuery();
  const sortingType = useSelector(selectSortingType);

  const fetchRatingsNextBatch = (args?: FetchFunctionArgs) => {
    const { limit, ratingsListUpdateMethod, cursor } = {
      ...fetchFunctionDefaultArgs,
      ...args,
    };

    const queryArgs = {
      ratingFieldName: sortingType,
      cursor: cursor ?? currentFetchedRatingsCount,
      limit,
      ratingsListUpdateMethod,
    };

    sendGetRatingsQuery(queryArgs);
  };

  return {
    fetchRatingsNextBatch,
    fetchRatingsBatchQueryState: getRatingsQueryState,
  };
}
