import { FC, memo } from 'react';
import './PlayerCard.css';
import type { RatingEntityMetrics } from '@/store/api/leaderboard/leaderboard.api.types';
import playerAvatarFallback from '@/images/leaderboard/player-avatar-fallback.png';
import classNames from 'classnames';

type Props = RatingEntityMetrics & {
  ratingVersion: number;
  login: string;
  avatar?: string;
  owner: boolean;
};

// Компонент карточки пользователя в таблице рейтинга
const PlayerCard: FC<Props> = props => {
  const { games, winrate, maxScore, owner, login, ratingVersion, avatar } =
    props;

  return (
    <li
      className={classNames('leaderboard__player', {
        leaderboard__player_type_owner: owner,
      })}>
      <div className="leaderboard__player-container">
        <img
          src={avatar ?? playerAvatarFallback}
          alt={'Аватар игрока'}
          className="leaderboard__user-avatar"
        />
        <div className="leaderboard__player-info">
          <h2 className="leaderboard__login">{`${login} (v${ratingVersion})`}</h2>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Победы: {winrate}%</span>
          </p>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Количество игр: {games}</span>
          </p>
        </div>
      </div>
      <span className="leaderboard__rank">{maxScore}</span>
    </li>
  );
};

export default memo(PlayerCard);
