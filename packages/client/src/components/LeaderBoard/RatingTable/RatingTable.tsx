import { selectUserLogin } from '@/store/auth/selectors';
import { selectAllRatings } from '@/store/leaderboard/selectors';
import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from './PlayerCard/PlayerCard';
import './RatingTable.css';

const RatingTable: FC = () => {
  const currentUserLogin = useSelector(selectUserLogin);
  const playersRatings = useSelector(selectAllRatings);

  const ratingsList = playersRatings.map(ratingEntry => {
    const { userLogin, userNickname, userAvatar, games, winrate, wins, loses } =
      ratingEntry;

    return (
      <PlayerCard
        key={userLogin}
        userLogin={userLogin}
        userNickname={userNickname}
        userAvatar={userAvatar}
        games={games}
        wins={wins}
        loses={loses}
        winrate={winrate}
        owner={userLogin === currentUserLogin}
      />
    );
  });

  return <ul className="leaderboard__rating-table">{ratingsList}</ul>;
};

export default memo(RatingTable);
