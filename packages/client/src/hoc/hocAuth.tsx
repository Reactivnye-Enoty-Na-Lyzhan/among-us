import { FC } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function hocAuth<Props extends Record<string, unknown>>(
  Component: FC<Props>
): FC<Props> {
  return props => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
}

export default hocAuth;
