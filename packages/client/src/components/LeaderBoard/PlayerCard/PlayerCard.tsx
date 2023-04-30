import { FC, memo } from 'react';
import './PlayerCard.css';
import type { RatingEntityMetrics } from '@/store/api/leaderboard/leaderboard.types';
import { PLAYER_AVATAR_FALLBACK } from '@/images/leaderboard/player-avatar-fallback';

type Props = RatingEntityMetrics & {
  nickname: string;
  owner: boolean;
};

// Компонент карточки пользователя в таблице рейтинга
const PlayerCard: FC<Props> = props => {
  const { games, winrate, rank, owner, nickname } = props;

  return (
    <li
      className={`leaderboard__player${
        owner ? ' leaderboard__player_type_owner' : ''
      }`}>
      <div className="leaderboard__player-container">
        <img
          src={PLAYER_AVATAR_FALLBACK}
          alt={'Аватар игрока'}
          className="leaderboard__user-avatar"
        />
        <div className="leaderboard__player-info">
          <h2 className="leaderboard__nickname">{nickname}</h2>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Победы: </span>
            {winrate}%
          </p>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Количество игр: </span>
            {games}
          </p>
        </div>
      </div>
      <span className="leaderboard__rank">{rank}</span>
    </li>
  );
};

export default memo(PlayerCard);
