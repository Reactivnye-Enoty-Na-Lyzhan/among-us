import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Options = {
  onUnauthenticatedRedirection: null | string;
  onAuthenticatedRedirection: null | string;
};

const defaultOptions: Options = {
  onUnauthenticatedRedirection: '/signin',
  onAuthenticatedRedirection: null,
};

function hocAuth<Props extends Record<string, unknown>>(
  Component: FC<Props>,
  initOptions?: Partial<Options>
): FC<Props> {
  return props => {
    const { isAuthenticated } = useAuth();

    const options = { ...defaultOptions, ...initOptions };

    if (isAuthenticated) {
      const redirection = options.onAuthenticatedRedirection;
      if (redirection) {
        return <Navigate to={redirection} replace={true} />;
      }

      return <Component {...props} />;
    } else {
      const redirection = options.onUnauthenticatedRedirection;

      if (redirection) {
        return <Navigate to={redirection} replace={true} />;
      }

      return <Component {...props} />;
    }
  };
}

export default hocAuth;
