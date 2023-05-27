import { FC, memo, useContext, useEffect, useRef } from 'react';
import { useActions } from '@/hooks/useActions';
import canvasProcess from './canvasProcess';
import './Game.css';
import killIcon from '@/images/game/kill.svg';
import startMeetingIcon from '@/images/game/start-meeting.svg';
import startMiniGameIcon from '@/images/game/start-minigame.svg';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectPlayer } from '@/store/game/game.slice';

const Game: FC = () => {
  const { id: playerId } = useTypedSelector(selectPlayer);
  const { finishGame } = useActions();
  const socket = useContext(GameSocketContext);

  const handleFinishGame = () => {
    // player id должен быть игрока, которого шлёпнуть. Для примера - id нашего игрока
    socket.emit('killPlayer', playerId, id => {
      console.log(id);
    });

    finishGame({
      result: 'win',
      score: 350,
    });
  };

  const canvasRef = useRef(null);
  const miniGameAction = useRef(null);
  const meetingAction = useRef(null);
  const killAction = useRef(null);

  useEffect(() => {
    if (
      canvasRef.current &&
      miniGameAction.current &&
      meetingAction.current &&
      killAction.current
    ) {
      canvasProcess(
        canvasRef.current,
        meetingAction.current,
        miniGameAction.current,
        killAction.current
      );
    }
  }, []);

  useEffect(() => {
    socket.emit('getPlayers', players => {
      console.log(players);
    });
  }, [socket]);

  return (
    <div className="game">
      <div className="game__canvas-container">
        <canvas ref={canvasRef} id="main-canvas"></canvas>

        <button className="game__action-btn" ref={miniGameAction}>
          <img src={startMiniGameIcon}></img>
        </button>

        <button className="game__action-btn" ref={meetingAction}>
          <img src={startMeetingIcon}></img>
        </button>

        <button
          ref={killAction}
          className="game__action-btn"
          onClick={handleFinishGame}>
          <img src={killIcon}></img>
        </button>
      </div>
    </div>
  );
};

export default memo(Game);
