import { selectRatingsListSize } from '@/store/leaderboard/selectors';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export function useFetchedRatingCount() {
  const currentFetchedRatingsCount = useSelector(selectRatingsListSize);

  const fetchedRatingsCountRef = useRef(currentFetchedRatingsCount);
  fetchedRatingsCountRef.current = currentFetchedRatingsCount;

  return { currentFetchedRatingsCount, fetchedRatingsCountRef };
}
