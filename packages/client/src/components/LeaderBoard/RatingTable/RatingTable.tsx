import type { LeaderboardDataType } from '@/utils/leaderboardData';
import PlayerCard from '../PlayerCard/PlayerCard';
import './RatingTable.css';

type Props = {
  playersEntries: LeaderboardDataType[];
};

export function RatingTable({ playersEntries }: Props) {
  // TODO
  const currentUser = 'loshadka';

  return (
    <ul className="leaderboard__rating-table">
      {playersEntries.map(player => (
        <PlayerCard
          key={player.nickname}
          avatar={player.avatar}
          nickname={player.nickname}
          games={player.games}
          wins={player.wins}
          rank={player.rank}
          owner={player.nickname === currentUser}
        />
      ))}
    </ul>
  );
}
