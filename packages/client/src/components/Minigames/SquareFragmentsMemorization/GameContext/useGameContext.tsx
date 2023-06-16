import { useMemo, useRef, useState } from 'react';
import { GameStage, type GameStatus } from './types';
import { useMemorizationSequence } from './useMemorizationSequence';

const initGameStatus = {
  stage: GameStage.MEMORIZATION,
  level: 1,
};

export function useGameContext() {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    ...initGameStatus,
  });
  const gameStatusRef = useRef(gameStatus);
  gameStatusRef.current = gameStatus;

  const { memorizationSequenceRef, expandMemorizationSequence } =
    useMemorizationSequence();

  return useMemo(() => {
    const switchStageType = () => {
      setGameStatus(currentStatus => {
        const nextStage =
          currentStatus.stage === GameStage.MEMORIZATION
            ? GameStage.REPRODUCTION
            : GameStage.MEMORIZATION;

        console.log(`SWITCH STAGE: ${currentStatus.stage} -> ${nextStage}`);

        return {
          ...currentStatus,
          stage: nextStage,
        };
      });
    };

    const increaseStageLevel = () => {
      expandMemorizationSequence();
      setGameStatus(currentStatus => ({
        ...currentStatus,
        level: currentStatus.level + 1,
      }));
    };

    return {
      gameStatusRef,
      memorizationSequenceRef,
      expandMemorizationSequence,
      switchStageType,
      increaseStageLevel,
    };
  }, []);
}
