import { FC, memo, useContext, useEffect, useRef } from 'react';
import { useActions } from '@/hooks/useActions';
import canvasProcess from './canvasProcess';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  selectGame,
  selectPlayer,
  selectPlayers,
} from '@/store/game/game.slice';
import { useUpdateScoreMutation } from '@/store/game/game.api';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import killIcon from '@/images/game/kill.svg';
import startMeetingIcon from '@/images/game/start-meeting.svg';
import startMiniGameIcon from '@/images/game/start-minigame.svg';
import type { PlayerRoleType } from '@/store/game/game.types';
import './Game.css';

const Game: FC = () => {
  const { id: playerId } = useTypedSelector(selectPlayer);
  const players = useTypedSelector(selectPlayers);
  const gameId = useTypedSelector(selectGame);

  const [completeTask] = useUpdateScoreMutation();

  const { killPlayer, finishGame } = useActions();

  const socket = useContext(GameSocketContext);

  const canvasRef = useRef(null);
  const miniGameAction = useRef(null);
  const meetingAction = useRef(null);
  const killAction = useRef(null);

  useEffect(() => {
    let unsubRefs: any;
    if (
      canvasRef.current &&
      miniGameAction.current &&
      meetingAction.current &&
      killAction.current &&
      players.length &&
      playerId &&
      socket &&
      gameId
    ) {
      unsubRefs = canvasProcess(
        canvasRef.current,
        meetingAction.current,
        miniGameAction.current,
        killAction.current,
        players,
        playerId,
        socket,
        gameId
      );
    }
    return () => {
      const {moveCrewman, handlePlayerKill} = unsubRefs;
      socket.off('move', moveCrewman);
      socket.off('onPlayerKill', handlePlayerKill);
    };
  }, []);

  useEffect(() => {
    socket.on('onPlayerKill', noticePlayerKill);
    // socket.on('onGameEnd', handleFinishGame);

    return () => {
      socket.off('onPlayerKill', noticePlayerKill);
    //   socket.off('onGameEnd', handleFinishGame);
    };
  }, [socket]);

  // Обработчик уничтожения игрока
  const handlePlayerKill = (e: any) => {
    const targetId = Number(e.currentTarget.dataset.targetId);
    console.log('kill player with ', targetId);

    if (!gameId) return;

    socket.emit('killPlayer', gameId, targetId);
  };

  // Коллбэк-уведомление убийства игрока
  const noticePlayerKill = (playerId: number) => {
    killPlayer(playerId);
    // console.log('he dead: ', playerId);
  };

  // Обработчик выполнения задачи
  const handleCompleteTask = async (e: any) => {
    const taskId = Number(e.currentTarget.dataset.targetId);
    console.log('start task with id: ', taskId);
    try {
      if (!gameId || !playerId) return;

      const completedTask = await completeTask({
        playerId,
        gameId,
        taskId,
      });

      if ('error' in completedTask) return;

      socket.emit('completeTask', gameId);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // Обработчик завершения игры
  const handleFinishGame = (winner: PlayerRoleType) => {
    // Выставляем рейтинг игроку
    if (playerId) {
      socket.emit('setPlayerRating', playerId, winner);
    }
    finishGame(winner);
  };

  const handleMeetingStart = () => {
    console.log(`user with id ${playerId} started emergency meeting!`);
  };
  return (
    <div className="game">
      <div className="game__canvas-container">
        <canvas ref={canvasRef} id="main-canvas"></canvas>

        <button
          className="game__action-btn"
          ref={miniGameAction}
          onClick={handleCompleteTask}>
          <img src={startMiniGameIcon}></img>
        </button>

        <button className="game__action-btn" ref={meetingAction} onClick={handleMeetingStart}>
          <img src={startMeetingIcon}></img>
        </button>

        <button
          ref={killAction}
          className="game__action-btn"
          onClick={handlePlayerKill}>
          <img src={killIcon}></img>
        </button>
      </div>
    </div>
  );
};

export default memo(Game);
