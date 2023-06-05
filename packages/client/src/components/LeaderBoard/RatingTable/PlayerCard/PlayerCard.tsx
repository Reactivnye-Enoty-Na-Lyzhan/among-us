import playerAvatarFallback from '@/images/leaderboard/player-avatar-fallback.png';
import { PlayerRatingRecord } from '@/store/leaderboard/leaderboard.types';
import classNames from 'classnames';
import { FC, memo } from 'react';
import './PlayerCard.css';

type Props = PlayerRatingRecord & {
  owner: boolean;
};

// Компонент карточки пользователя в таблице рейтинга
const PlayerCard: FC<Props> = props => {
  const { games, winrate, owner, userLogin, userNickname, userAvatar } = props;

  return (
    <li
      className={classNames('leaderboard__player', {
        leaderboard__player_type_owner: owner,
      })}>
      <div className="leaderboard__player-container">
        <img
          src={userAvatar ?? playerAvatarFallback}
          alt={'Аватар игрока'}
          className="leaderboard__user-avatar"
        />
        <div className="leaderboard__player-info">
          <h2 className="leaderboard__player-name">
            {userNickname ?? userLogin}
          </h2>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Победы: {winrate}%</span>
          </p>
          <p className="leaderboard__player-achievement">
            <span className="leaderboard__accent">Количество игр: {games}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(PlayerCard);
