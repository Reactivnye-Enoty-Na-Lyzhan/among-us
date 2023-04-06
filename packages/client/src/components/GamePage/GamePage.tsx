import { memo } from 'react';
import StartGame from './StartGame/StartGame';
import './GamePage.css';

// Основной компонент игры
function GamePage() {
  const hasActiveGame = false;

  return <main className="game">{!hasActiveGame && <StartGame />}</main>;
}

export default memo(GamePage);
