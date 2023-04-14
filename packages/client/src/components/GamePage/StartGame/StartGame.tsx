import { memo, FC } from 'react';
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
  return (
    <Routes>
      <Route path="" element={<StartMenu />} />
      <Route path="find" element={<SearchGame />} />
      <Route path="create" element={<CreateGame />} />
      <Route path="how-to-play" element={<HowToPlay />} />
      <Route path="/*" element={<ProtectedGame />}>
        <Route
          path="assembling"
          element={<TeamAssembling />}
        />
        <Route
          path="preparing"
          element={<FinalPreparing />}
        />
        <Route
          path="await"
          element={<AwaitStart />}
        />
      </Route>
    </Routes>
  );
};

export default memo(StartGame);
