import { useGetUserQuery } from '../store/auth/auth.slice';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const { data, isLoading } = useGetUserQuery();
  const isAuthenticated = data !== null && data !== undefined;

  return { isAuthenticated, isLoading };
};

export default useAuth;
