import { FC, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isStarted: boolean;
};

// Защита внутренних страниц компонента game
const ProtectedGame: FC<Props> = props => {
  const { isStarted } = props;

  return <>{isStarted ? <Outlet /> : <Navigate to=".." />}</>;
};

export default memo(ProtectedGame);
