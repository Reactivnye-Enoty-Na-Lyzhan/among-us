import { FC, memo } from 'react';
import StartGame from './StartGame/StartGame';
import GameEnd from '../GameEnd/GameEnd';
import './GamePage.css';

interface Props {
  result: 'lose' | 'win';
  score: number;
}

// Основной компонент игры
const GamePage: FC<Props> = props => {
  const { result, score } = props;
  const hasActiveGame = false;
  const isGameEnded = false;

  return (
    <main className="game">
      {!hasActiveGame && <StartGame />}
      {isGameEnded && <GameEnd result={result} score={score} />}
    </main>
  );
};

export default memo(GamePage);
