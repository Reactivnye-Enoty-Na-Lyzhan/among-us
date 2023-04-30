import PlayerCard from '../PlayerCard/PlayerCard';
import './RatingTable.css';
import { FC, memo } from 'react';
import { useGetRatingsQuery } from '@/store/api/leaderboard/leaderboard.slice';
import { selectUserID } from '@/store/auth/selectors';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const RatingTable: FC = () => {
  const getRatingsQuery = useGetRatingsQuery({ cursor: 0, limit: 10 });
  const playersRatingEntries = getRatingsQuery.data ?? [];

  const currentUserID = useTypedSelector(selectUserID);

  return (
    <ul className="leaderboard__rating-table">
      {playersRatingEntries.map(ratingEntry => (
        <PlayerCard
          key={ratingEntry.userID}
          nickname={`${ratingEntry.userID} v${ratingEntry.ratingID}`}
          rank={ratingEntry.rank}
          games={ratingEntry.games}
          winrate={ratingEntry.winrate}
          owner={ratingEntry.userID === currentUserID}
        />
      ))}
    </ul>
  );
};

export default memo(RatingTable);
