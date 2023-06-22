import { LoaderScreen } from '@/components/Loader/LoaderScreen/LoaderScreen';
import { useActions } from '@/hooks/useActions';
import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Options = {
  onUnauthenticatedRedirection: null | string;
  onAuthenticatedRedirection: null | string;
  shouldUseLoader: boolean;
};
type initOptions = Partial<Options>;

const defaultOptions: Options = {
  onUnauthenticatedRedirection: '/signin',
  onAuthenticatedRedirection: null,
  shouldUseLoader: true,
};

function hocAuth<Props extends Record<string, unknown>>(
  Component: FC<Props>,
  initOptions?: initOptions
): FC<Props> {
  return props => {
    const options = { ...defaultOptions, ...initOptions };
    const {
      onAuthenticatedRedirection,
      onUnauthenticatedRedirection,
      shouldUseLoader,
    } = options;

    const { isAuthenticated, isLoading } = useAuth();
    const loadingStatus = isLoading;
    const { setLoadingStatus } = useActions();

    useEffect(() => {
      if (shouldUseLoader) {
        setLoadingStatus(loadingStatus);
      }
    }, [loadingStatus, shouldUseLoader]);

    if (shouldUseLoader && loadingStatus) {
      return <LoaderScreen></LoaderScreen>;
    }

    if (isAuthenticated) {
      const redirection = onAuthenticatedRedirection;
      if (redirection) {
        return <Navigate to={redirection} replace={true} />;
      }

      return <Component {...props} />;
    } else {
      const redirection = onUnauthenticatedRedirection;

      if (redirection) {
        return <Navigate to={redirection} replace={true} />;
      }

      return <Component {...props} />;
    }
  };
}

export default hocAuth;
