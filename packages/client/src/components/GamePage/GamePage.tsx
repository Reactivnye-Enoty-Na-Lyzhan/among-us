import { FC, memo, useCallback, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './Game/Game';
import GameEnd from './StagePages/GameEnd/GameEnd';
import SearchGame from './StagePages/SearchGame/SearchGame';
import CreateGame from './StagePages/CreateGame/CreateGame';
import HowToPlay from './StagePages/HowToPlay/HowToPlay';
import StartMenu from './StagePages/StartMenu/StartMenu';
import TeamAssembling from './StagePages/TeamAssembling/TeamAssembling';
import CharacterSelection from './StagePages/CharacterSelection/CharacterSelection';
import StartAwaiting from './StagePages/StartAwaiting/StartAwaiting';
import hocAuth from '@/hoc/hocAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectGame } from '@/store/game/game.slice';
import { useLeaveGameMutation } from '@/store/game/game.api';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { SIGNIN_URL } from '@/utils/constants';
import type { GameStatusType } from '@/store/game/game.types';
import './GamePage.css';

type IConditionTable = {
  [k in GameStatusType]: () => JSX.Element;
};

// Основной компонент игры
const GamePage: FC = () => {
  const status = useTypedSelector(state => state.game.status);
  const gameId = useTypedSelector(selectGame);
  const socket = useContext(GameSocketContext);
  const [leaveGame] = useLeaveGameMutation();

  // Устанавливаем соединение с сокет-сервером
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();

      // Выход из игры, если она не в активном или завершённом состоянии
      const isActiveOrFinished = status === 'active' || status === 'finished';
      if (!isActiveOrFinished && gameId) {
        leaveGame({
          gameId,
        });
      }
    };
  }, []);

  const hashReturner: IConditionTable = {
    init: () => <StartMenu />,
    assembling: () => <TeamAssembling />,
    characterSelection: () => <CharacterSelection />,
    startAwaiting: () => <StartAwaiting />,
    active: () => <Game />,
    finished: () => <GameEnd />,
  };

  const currentPage = useCallback(() => {
    return hashReturner[status]();
  }, [status]);

  return (
    <main className="game-page">
      <Routes>
        <Route path="find" element={<SearchGame />} />
        <Route path="create" element={<CreateGame />} />
        <Route path="how-to-play" element={<HowToPlay />} />
        <Route path="*" element={currentPage()} />
      </Routes>
    </main>
  );
};

export default hocAuth(memo(GamePage), {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
