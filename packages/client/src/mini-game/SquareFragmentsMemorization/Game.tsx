import { type FC } from 'react';
import MemorizationPanel from './MemorizationPanel/MemorizationPanel';
import PickingPanel from './PickingPanel/PickingPanel';
import { GameContext } from './GameContext/context';
import { useGameContext } from './GameContext/useGameContext';

import { GameStage } from './GameContext/types';
import './Game.css';

const GAME_MAX_LEVEL = 5;

const Game: FC = () => {
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

  return (
    <GameContext.Provider value={gameStageContext}>
      <div className="square-fragments-memorization-game">
        {gameStatus.level <= GAME_MAX_LEVEL ? (
          <>
            <MemorizationPanel />
            <PickingPanel />
          </>
        ) : (
          <div style={{ fontSize: '2rem' }}>Мини Игра Пройдена!</div>
        )}
      </div>
    </GameContext.Provider>
  );
};

export { Game };
