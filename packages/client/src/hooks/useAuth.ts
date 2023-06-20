import { useGetUserQuery } from '../store/auth/auth.slice';

interface AuthState {
  isAuthenticated: boolean;
  isFetching: boolean;
}

const useAuth = (): AuthState => {
  const { isFetching, isSuccess } = useGetUserQuery();
  const isAuthenticated = isSuccess;

  return { isAuthenticated, isFetching };
};

export default useAuth;
