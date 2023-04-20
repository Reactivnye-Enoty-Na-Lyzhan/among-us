import { FC, memo, useEffect, useRef } from 'react';
import { useActions } from '@/hooks/useActions';
import canvasProcess from './canvasProcess';
import './Game.css';
import killIcon from '@/images/game/kill.svg';
import startMeetingIcon from '@/images/game/start-meeting.svg';
import startMiniGameIcon from '@/images/game/start-minigame.svg';

const Game: FC = () => {
  const { finishGame } = useActions();
  const handleFinishGame = () => {
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
