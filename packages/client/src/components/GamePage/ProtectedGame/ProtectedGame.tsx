import { FC, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';

// Защита внутренних страниц компонента game
const ProtectedGame: FC = () => {
  const stage = useTypedSelector(state => state.game.stage);

  return stage === 'preparing' ? <Outlet /> : <Navigate to="" />;
};

export default memo(ProtectedGame);
