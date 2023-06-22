import { useGetUserQuery } from '../store/auth/auth.slice';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

const useAuth = (): AuthState => {
  const { isLoading, isFetching, isSuccess } = useGetUserQuery();
  const isAuthenticated = isSuccess;

  return { isAuthenticated, isLoading, isFetching };
};

export default useAuth;
