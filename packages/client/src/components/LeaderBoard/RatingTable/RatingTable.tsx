import PlayerCard from '../PlayerCard/PlayerCard';
import { type FC, memo } from 'react';
import { selectUserLogin } from '@/store/auth/selectors';
import { useSelector } from 'react-redux';
import {
  selectAllRatingsSorted,
  selectSortingType,
} from '@/store/leaderboard/selectors';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import './RatingTable.css';

const RatingTable: FC = () => {
  const currentUserLogin = useSelector(selectUserLogin);
  const sortingType = useSelector(selectSortingType);
  const playersRatings = useTypedSelector(state =>
    selectAllRatingsSorted(state, sortingType)
  );

  const RatingsList = playersRatings.map(ratingEntry => {
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
