import { FC } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

type Options = {
  onUnauthenticatedRedirection: null | string;
  onAuthenticatedRedirection: null | string;
};

const defaultOptions: Options = {
  onUnauthenticatedRedirection: '/login',
  onAuthenticatedRedirection: null,
};

function hocAuth<Props extends Record<string, unknown>>(
  Component: FC<Props>,
  initOptions?: Partial<Options>
): FC<Props> {
  return props => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const options = { ...defaultOptions, ...initOptions };

    if (isAuthenticated) {
      const redirection = options.onAuthenticatedRedirection;
      if (redirection) {
        return <Navigate to={redirection} />;
      }

      return <Component {...props} />;
    } else {
      const redirection = options.onUnauthenticatedRedirection;

      if (redirection) {
        return <Navigate to={redirection} />;
      }

      return <Component {...props} />;
    }
  };
}

export default hocAuth;
