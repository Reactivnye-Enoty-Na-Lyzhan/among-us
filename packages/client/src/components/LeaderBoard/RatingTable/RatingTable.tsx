import PlayerCard from '../PlayerCard/PlayerCard';
import { FC, memo } from 'react';
import { useGetRatingsQuery } from '@/store/api/leaderboard/leaderboard.slice';
import { selectUserLogin } from '@/store/auth/selectors';
import { PAGINATION_BATCH_SIZE } from './constants';
import { useSelector } from 'react-redux';
import './RatingTable.css';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const RatingTable: FC = () => {
  const sortingType = useTypedSelector(state => state.leaderboard.sortingType);
  const getRatingsQuery = useGetRatingsQuery({
    cursor: 0,
    limit: PAGINATION_BATCH_SIZE,
    ratingFieldName: sortingType,
  });
  const currentUserLogin = useSelector(selectUserLogin);

  const playersRatingsData = getRatingsQuery.data ?? [];
  const RatingsList = playersRatingsData.map(ratingData => {
    const ratingEntry = ratingData.data;

    return (
      <PlayerCard
        key={ratingEntry.userLogin}
        ratingVersion={ratingEntry.ratingID}
        login={ratingEntry.userLogin}
        maxScore={ratingEntry.maxScore}
        games={ratingEntry.games}
        winrate={ratingEntry.winrate}
        owner={ratingEntry.userLogin === currentUserLogin}
      />
    );
  });

  return <ul className="leaderboard__rating-table">{RatingsList}</ul>;
};

export default memo(RatingTable);
