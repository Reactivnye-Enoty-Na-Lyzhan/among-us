import {
  EnumRatingSListUpdateMethod,
  RATINGS_FETCH_BATCH_SIZE,
} from '@-constants/leaderboard/ratings.constants';
import { useLazyGetRatingsQuery } from '@/store/api/leaderboard/api.slice';
import { GetRatingsRequestArgs } from '@/store/api/leaderboard/endpoints/getRatings/types';
import { selectSortingType } from '@/store/leaderboard/selectors';
import { OmitKeys } from '@/utils/objects-handle/types/omitKeys';
import { Optional } from '@/utils/objects-handle/types/optional';
import { useSelector } from 'react-redux';

type FetchFunctionArgs = Optional<
  OmitKeys<GetRatingsRequestArgs, 'sortField'>,
  'offset'
>;

const fetchFunctionDefaultArgs = {
  limit: RATINGS_FETCH_BATCH_SIZE,
  ratingsListUpdateMethod: EnumRatingSListUpdateMethod.UPSERT,
};

export function useFetchRatingsNextBatch(currentFetchedRatingsCount: number) {
  const [sendGetRatingsQuery, getRatingsQueryState] = useLazyGetRatingsQuery();
  const sortingType = useSelector(selectSortingType);

  const fetchRatingsNextBatch = (args?: FetchFunctionArgs) => {
    const { limit, ratingsListUpdateMethod, offset } = {
      ...fetchFunctionDefaultArgs,
      ...args,
    };

    const queryArgs = {
      sortField: sortingType,
      offset: offset ?? currentFetchedRatingsCount,
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
