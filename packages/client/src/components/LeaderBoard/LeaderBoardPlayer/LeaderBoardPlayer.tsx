import { FC, memo } from 'react';
import { LeaderboardDataType } from '../../../utils/leaderboardData';
import './LeaderBoardPlayer.css';

type Props = LeaderboardDataType & {
  owner: boolean,
};

// Компонент карточки пользователя в таблице рейтинга
const LeaderBoardPlayer: FC<Props> = (props) => {
  const {
    avatar,
    nickname,
    games,
    wins,
    rank,
    owner,
  } = props;

  return (
    <li className={`leaderboard__player${owner ? ' leaderboard__player_type_owner' : ''}`}>
      <div className="leaderboard__player-container">
        <img src={avatar} alt={`Аватар игрока ${nickname}.`} className="leaderboard__user-avatar" />
        <div className="leaderboard__player-info">
          <h2 className="leaderboard__nickname">{nickname}</h2>
          <p className="leaderboard__player-achievment">
            <span className="leaderboard__accent">Победы: </span>
            {wins}%
          </p>
          <p className="leaderboard__player-achievment">
            <span className="leaderboard__accent">Количество игр: </span>
            {games}
          </p>
        </div>
      </div>
      <span className="leaderboard__rank">{rank}</span>
    </li>
  );
};

export default memo(LeaderBoardPlayer);
