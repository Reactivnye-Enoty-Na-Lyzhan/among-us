import { useGetUserQuery } from '../store/auth/auth.slice';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const { isLoading, isSuccess } = useGetUserQuery();
  const isAuthenticated = isSuccess;

  return { isAuthenticated, isLoading };
};

export default useAuth;
