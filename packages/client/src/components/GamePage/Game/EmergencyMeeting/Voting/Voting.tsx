import { FC, memo, useCallback, useState } from 'react';
import CrewmanCard from './CrewmanCard/CrewmanCard';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectPlayer, selectPlayers } from '@/store/game/game.slice';
import { sortPlayer } from '@/utils/game/sortPlayers';
import type { IPlayer } from '@/store/game/game.types';
import './Voting.css';

const Voting: FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer['id'] | null>(
    null
  );
  const { id: currentPlayerId } = useTypedSelector(selectPlayer);
  const players = useTypedSelector(selectPlayers);
  const initiator = useTypedSelector(state => state.game.meetings.initiator);
  const discussion = useTypedSelector(state => state.game.params.discussion);

  const sortedPlayers = sortPlayer(currentPlayerId, players);

  // Обработчик голосования
  const handleVoteForPlayer = useCallback((targetId: IPlayer['id']) => {
    if (!targetId) return;

    setSelectedPlayer(currentTarget =>
      currentTarget === targetId ? null : targetId
    );
    console.log(selectedPlayer, targetId);
  }, []);

  return (
    <div className="meeting-voting">
      <h1 className="meeting-voting__title">Голосование</h1>
      <ul className="meeting-voting__crew">
        {sortedPlayers.map(player => (
          <CrewmanCard
            key={player.id}
            color={player.color}
            initiator={initiator === currentPlayerId}
            nickname={player.user?.nickname || 'default'}
            login={player.user?.login || 'default'}
            id={player.id}
            isVotedFor={player.id === selectedPlayer}
            voted={
              currentPlayerId === player.id && selectedPlayer ? true : false
            }
            onVote={handleVoteForPlayer}
          />
        ))}
      </ul>
      <p className="meeting-voting__time-left">
        <span className="meeting-voting__accent">Времени осталось - </span>
        {discussion} сек.
      </p>
    </div>
  );
};

export default memo(Voting);
