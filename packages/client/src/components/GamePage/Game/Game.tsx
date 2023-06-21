import { FC, memo, useContext, useEffect, useRef, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import canvasProcess from './canvasProcess';
import EmergencyMeeting from './EmergencyMeeting/EmergencyMeeting';
import MinigameModal from '@/components/Minigames/Modal/Modal';
import Notification from './UI/Notification/Notification';
import MeetingScreen from './UI/MeetingScreen/MeetingScreen';
import TaskInterface from './UI/TaskInterface/TaskInterface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  selectGame,
  selectTask,
  selectMeeting,
  selectPlayer,
  selectPlayers,
} from '@/store/game/game.slice';
import { useUpdateScoreMutation } from '@/store/game/game.api';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { MeetingMessages } from '@/utils/game/MeetingMessages';
import type { IMeetingResult, PlayerRoleType } from '@/store/game/game.types';
import './Game.css';
import { getNextTask } from '@/utils/game/getNextTask';

const Game: FC = () => {
  const [meetingResult, setMeetingResult] = useState<IMeetingResult | null>(
    null
  );
  const { id: playerId } = useTypedSelector(selectPlayer);
  const players = useTypedSelector(selectPlayers);
  const gameId = useTypedSelector(selectGame);
  const { isProccessing: meetingIsProccessing } =
    useTypedSelector(selectMeeting);
  const isGameErrorActive = useTypedSelector(
    state => state.game.error.isActive
  );
  const { targetTask, lastTask } = useTypedSelector(selectTask);

  const [minigameId, setMinigameId] = useState<number | undefined>(undefined);

  const [completeTask] = useUpdateScoreMutation();

  const {
    killPlayer,
    finishGame,
    startMeeting,
    stopMeeting,
    setGameError,
    clearGameError,
    cancelGame,
    setTargetTask,
  } = useActions();

  const socket = useContext(GameSocketContext);

  const canvasRef = useRef(null);
  const miniGameAction = useRef(null);
  const meetingAction = useRef(null);
  const killAction = useRef(null);
  const isBlocked = useRef(false);

  useEffect(() => {
    let unsubRefs: any;
    console.log('Игроки из Awaiting', players, gameId, socket.id);
    if (!players.length) return;

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
        gameId,
        isBlocked
      );
    }
    return () => {
      const { moveCrewman, handlePlayerKill } = unsubRefs;
      socket.off('move', moveCrewman);
      socket.off('onPlayerKill', handlePlayerKill);
    };
  }, [players.length]);

  useEffect(() => {
    if (meetingIsProccessing) {
      isBlocked.current = true;
    } else {
      isBlocked.current = false;
    }
  }, [meetingIsProccessing]);

  useEffect(() => {
    socket.on('onPlayerKill', noticePlayerKill);
    socket.on('onGameEnd', handleFinishGame);
    socket.on('onEmergencyMeeting', handleStartMeeting);
    socket.on('onUnavaliableMeeting', informAboutMeeting);
    socket.on('onFinishMeeting', handleFinishMeeting);

    return () => {
      socket.off('onPlayerKill', noticePlayerKill);
      socket.off('onGameEnd', handleFinishGame);
      socket.off('onEmergencyMeeting', handleStartMeeting);
      socket.off('onUnavaliableMeeting', informAboutMeeting);
      socket.off('onFinishMeeting', handleFinishMeeting);
    };
  }, [socket]);

  // Обработчик начала встречи
  const handleStartMeeting = (initiatorId: number) => {
    startMeeting(initiatorId);
    isBlocked.current = true;
  };

  // Обработчик завершения встречи
  const handleFinishMeeting = (playerId?: number) => {
    stopMeeting();
    // Если игрок не выбран, выводи сообщение о статусе собрания
    if (!playerId) {
      setGameError({
        title: 'Итог голосования',
        text: MeetingMessages.missedMeeting,
      });

      // Очищаем ошибку
      setTimeout(() => {
        clearGameError();
      }, 5000);
      return;
    }

    // Получаем игрока, за которого проголосовали
    const votedPlayer = players.find(player => player.id === playerId);

    if (!votedPlayer) return;

    // Устанавливаем результат голосования
    setMeetingResult({
      role: votedPlayer.role,
      color: votedPlayer.color,
    });

    // Скрываем экран с результатами голосования по прошествии времени
    setTimeout(() => {
      setMeetingResult(null);
      if (gameId) {
        // 4=й аргумент означает информирует об "унитчтожении персонажа" по итогу голосования
        socket.emit('killPlayer', gameId, playerId, true);
      }
    }, 15000);
  };

  // Информирование о неудачной инициализации собрания
  const informAboutMeeting = (reason: string) => {
    setGameError({
      title: 'Ошибка собрания',
      text: reason,
    });

    setTimeout(() => {
      clearGameError();
    }, 3500);
  };

  // Обработчик уничтожения игрока
  const handlePlayerKill = (e: any) => {
    const targetId = Number(e.currentTarget.dataset.targetId);

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

    if (taskId !== targetTask) return;

    setMinigameId(taskId);
    isBlocked.current = true;
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
    if (meetingIsProccessing) return;

    if (gameId && playerId) {
      socket.emit('assembleMeeting', gameId, playerId);
    }
  };

  const handleMinigameClose = () => {
    setMinigameId(undefined);
    isBlocked.current = false;
  };

  const handleMinigameWin = async () => {
    try {
      if (!gameId || !playerId || !minigameId) return;

      const completedTask = await completeTask({
        playerId,
        gameId,
        taskId: minigameId,
      });

      if ('error' in completedTask) return;

      socket.emit('completeTask', gameId);
      isBlocked.current = false;
      setMinigameId(undefined);

      const nextTask = getNextTask(minigameId, lastTask);
      console.log('NEXT TASK', nextTask, minigameId, lastTask);

      if (nextTask) {
        setTargetTask(nextTask);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // Обработчик выхода из игры
  const handleExitGame = () => {
    if (gameId && playerId) {
      socket.emit('killPlayer', gameId, playerId, true);
    }

    cancelGame();
  };

  return (
    <div className="game">
      {minigameId ? (
        <MinigameModal
          gameId={minigameId}
          onWinCallback={handleMinigameWin}
          onCloseCallback={handleMinigameClose}
        />
      ) : null}
      <div className="game__canvas-container">
        <canvas ref={canvasRef} id="main-canvas"></canvas>
        <TaskInterface />
        {meetingResult && (
          <MeetingScreen
            color={meetingResult.color}
            role={meetingResult.role}
          />
        )}
        {meetingIsProccessing && <EmergencyMeeting />}
        {isGameErrorActive && <Notification />}
        <button
          className="game__action-btn game__action-btn_action_minigame"
          ref={miniGameAction}
          onClick={handleCompleteTask}
        />

        <button
          className="game__action-btn game__action-btn_action_meeting"
          ref={meetingAction}
          onClick={handleMeetingStart}
        />

        <button
          ref={killAction}
          className="game__action-btn game__action-btn_action_kill"
          onClick={handlePlayerKill}
        />

        <button className="game__exit-game-btn" onClick={handleExitGame} />
      </div>
    </div>
  );
};

export default memo(Game);
