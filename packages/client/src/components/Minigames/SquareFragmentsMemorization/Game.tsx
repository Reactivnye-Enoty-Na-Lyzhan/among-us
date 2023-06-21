import { type FC } from 'react';
import MemorizationPanel from './MemorizationPanel/MemorizationPanel';
import PickingPanel from './PickingPanel/PickingPanel';
import { GameContext } from './GameContext/context';
import { useGameContext } from './GameContext/useGameContext';

import { GameStage } from './GameContext/types';
import './Game.css';

type Props = {
  onWinCallback: () => void;
};

const GAME_MAX_LEVEL = 5;

const Game: FC<Props> = ({ onWinCallback }) => {
  const gameStageContext = useGameContext();
  const { gameStatusRef, memorizationSequenceRef, expandMemorizationSequence } =
    gameStageContext;
  const gameStatus = gameStatusRef.current;

  if (
    gameStatus.stage === GameStage.MEMORIZATION &&
    !memorizationSequenceRef.current.length
  ) {
    expandMemorizationSequence();
  }

  if (gameStatus.level > GAME_MAX_LEVEL) {
    setTimeout(() => {
      onWinCallback();
    }, 3000);
  }

  return (
    <GameContext.Provider value={gameStageContext}>
      <div className="square-fragments-memorization-game">
        {gameStatus.level <= GAME_MAX_LEVEL ? (
          <>
            <MemorizationPanel />
            <PickingPanel />
          </>
        ) : (
          <div className="minigame__win">
            Реактор стабилен, все проверки прошли успешно!
          </div>
        )}
      </div>
    </GameContext.Provider>
  );
};

export { Game };
