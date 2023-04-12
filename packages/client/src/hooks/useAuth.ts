import { useGetUserQuery } from '../store/auth/auth.slice';

const useAuth = () => {
  const { data, isLoading } = useGetUserQuery();
  if (isLoading) {
    return 'Loading';
  }
  return data !== null && data !== undefined && data !== false && data !== 0 && data !== '';
};

export default useAuth;
