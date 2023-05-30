import { FC, memo, useContext, useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import StartGame from './StartGame/StartGame';
import Game from './Game/Game';
import GameEnd from '../GameEnd/GameEnd';
import hocAuth from '@/hoc/hocAuth';
import { SIGNIN_URL } from '@/utils/constants';

import './GamePage.css';
import { GameSocketContext } from '@/utils/socket/gameSocket';

// Основной компонент игры
const GamePage: FC = () => {
  const status = useTypedSelector(state => state.game.status);
  const socket = useContext(GameSocketContext);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="game-page">
      {status === 'start' && <StartGame />}
      {status === 'active' && <Game />}
      {status === 'finished' && <GameEnd />}
    </main>
  );
};

export default hocAuth(memo(GamePage), {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
