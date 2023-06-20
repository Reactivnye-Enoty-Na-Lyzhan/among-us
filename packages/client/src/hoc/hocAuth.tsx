import { useLoader } from '@/hooks/useLoader';
import { SIGNIN_URL } from '@/utils/constants';
import { deepMergeTyped } from '@/utils/objects-handle/mergeObjects';
import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type RedirectionOptions = {
  onUnauthenticatedRedirection: null | string;
  onAuthenticatedRedirection: null | string;
};
type LoaderOptions = {
  isNeeded: boolean;
  minDisplayTimeMS: number;
};
type Options = RedirectionOptions & { loaderOptions: LoaderOptions };
type InitOptions = Partial<RedirectionOptions> & {
  loaderOptions?: Partial<LoaderOptions>;
};

const LOADER_MIN_DISPLAY_TIME_MS_DEFAULT = 1000;
const defaultOptions: Options = {
  onUnauthenticatedRedirection: SIGNIN_URL,
  onAuthenticatedRedirection: null,
  loaderOptions: {
    isNeeded: true,
    minDisplayTimeMS: LOADER_MIN_DISPLAY_TIME_MS_DEFAULT,
  },
};

function hocAuth<Props extends Record<string, unknown>>(
  Component: FC<Props>,
  initOptions: InitOptions = {}
): FC<Props> {
  return props => {
    const options = deepMergeTyped<Options>(defaultOptions, initOptions);
    const { isNeeded: shouldUseLoader, minDisplayTimeMS } =
      options.loaderOptions;

    const { isAuthenticated, isFetching: isRequestFetching } = useAuth();

    const { LoaderScreenComponent, isDisplayed: isLoaderDisplayed } = useLoader(
      {
        minDisplayTimeMS,
        isLoading: isRequestFetching,
      }
    );

    if (shouldUseLoader && isLoaderDisplayed) {
      return <LoaderScreenComponent />;
    }

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
