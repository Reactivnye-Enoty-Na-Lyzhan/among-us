import { memo, FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StartMenu from './StartMenu/StartMenu';
import TeamAssembling from './TeamAssembling/TeamAssembling';
import SearchGame from './SearchGame/SearchGame';
import CreateGame from './CreateGame/CreateGame';
import FinalPreparing from './FinalPreparing/FinalPreparing';
import AwaitStart from './AwaitStart/AwaitStart';
import HowToPlay from './HowToPlay/HowToPlay';
import ProtectedGame from '../ProtectedGame/ProtectedGame';

// Экран начала игры
const StartGame: FC = () => {
  const [isGameStarted, setGameStarted] = useState<boolean>(false);

  // Для прототипа
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Для прототипа
  const handleCancelGame = () => {
    setGameStarted(false);
  };

  return (
    <Routes>
      <Route path="" element={<StartMenu onStart={handleStartGame} />} />
      <Route path="find" element={<SearchGame onStart={handleStartGame} />} />
      <Route path="create" element={<CreateGame onStart={handleStartGame} />} />
      <Route path="how-to-play" element={<HowToPlay />} />
      <Route path="/*" element={<ProtectedGame isStarted={isGameStarted} />}>
        <Route
          path="assembling"
          element={<TeamAssembling onCancel={handleCancelGame} />}
        />
        <Route
          path="preparing"
          element={<FinalPreparing onCancel={handleCancelGame} />}
        />
        <Route
          path="await"
          element={<AwaitStart onCancel={handleCancelGame} />}
        />
      </Route>
    </Routes>
  );
};

export default memo(StartGame);
