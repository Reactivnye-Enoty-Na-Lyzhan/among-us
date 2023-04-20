import { FC, memo } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import StartGame from './StartGame/StartGame';
import Game from './Game/Game';
import GameEnd from '../GameEnd/GameEnd';
import './GamePage.css';

// Основной компонент игры
const GamePage: FC = () => {
  const status = useTypedSelector(state => state.game.status);

  return (
    <main className="game-page">
      {status === 'start' && <StartGame />}
      {status === 'active' && <Game />}
      {status === 'finished' && <GameEnd />}
    </main>
  );
};

export default memo(GamePage);
