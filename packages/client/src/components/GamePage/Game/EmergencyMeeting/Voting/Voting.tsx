import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import CrewmanCard from './CrewmanCard/CrewmanCard';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import {
  selectGame,
  selectMeeting,
  selectPlayer,
  selectPlayers,
} from '@/store/game/game.slice';
import { sortPlayer } from '@/utils/game/sortPlayers';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import type { IPlayer } from '@/store/game/game.types';
import './Voting.css';

const Voting: FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer['id'] | null>(
    null
  );
  const [votedList, setVotedList] = useState<IPlayer['id'][]>([]);
  const [counter, setCounter] = useState<number>(50);

  const { id: currentPlayerId } = useTypedSelector(selectPlayer);
  const players = useTypedSelector(selectPlayers);
  const { initiator } = useTypedSelector(selectMeeting);
  const discussion = useTypedSelector(state => state.game.params.discussion);
  const gameId = useTypedSelector(selectGame);

  const socket = useContext(GameSocketContext);

  const { stopMeeting } = useActions();

  const sortedPlayers = sortPlayer(currentPlayerId, players);

  useEffect(() => {
    socket.on('onLastSecondsMeeting', handleFinishMeeting);
    socket.on('onVote', handleVoteStatus);

    return () => {
      socket.off('onLastSecondsMeeting', handleFinishMeeting);
      socket.off('onVote', handleVoteStatus);
    };
  }, [socket]);

  useEffect(() => {
    setCounter(discussion);
  }, [discussion]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (counter > 0) {
      timeout = setTimeout(() => {
        setCounter(timeLeft => timeLeft - 1);
      }, 1000);
    } else {
      stopMeeting();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);


  // Обработчик входящего статуса проголосовавших
  const handleVoteStatus = (votedList: IPlayer['id'][]) => {
    setVotedList(votedList);
  };

  // Обработчик голосования
  const handleVoteForPlayer = useCallback((targetId: IPlayer['id']) => {
    if (!targetId) return;

    setSelectedPlayer(currentTarget =>
      currentTarget === targetId ? null : targetId
    );

    if (gameId && currentPlayerId) {
      if (targetId === selectedPlayer) {
        socket.emit('removeVote', gameId, currentPlayerId, targetId, (votedList) => {
          setVotedList(votedList);
        });
        return;
      }

      socket.emit('voteForPlayer', gameId, currentPlayerId, selectedPlayer, targetId, (votedList) => {
        setVotedList(votedList);
      });
    }
  }, [selectedPlayer]);

  // Обработчик завершения встречи
  const handleFinishMeeting = () => {
    setCounter(3);
  };

  return (
    <div className="meeting-voting">
      <h1 className="meeting-voting__title">Голосование</h1>
      <ul className="meeting-voting__crew">
        {sortedPlayers.map(player => (
          <CrewmanCard
            key={player.id}
            color={player.color}
            initiator={initiator === player.id}
            nickname={player.user?.nickname || 'default'}
            login={player.user?.login || 'default'}
            id={player.id}
            isVotedFor={player.id === selectedPlayer}
            voted={votedList.includes(player.id)}
            alive={player.alive}
            onVote={handleVoteForPlayer}
          />
        ))}
      </ul>
      <p className="meeting-voting__time-left">
        <span className="meeting-voting__accent">Времени осталось - </span>
        {`${counter > 0 ? `${counter} сек` : 'завершение голосования'}`}.
      </p>
    </div>
  );
};

export default memo(Voting);
