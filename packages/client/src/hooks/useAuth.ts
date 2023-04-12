import { useGetUserQuery } from '../store/auth/auth.slice';

const useAuth = () => {
  const { data, isLoading } = useGetUserQuery();
  if (isLoading) {
    return 'Loading';
  }
  return data !== null && data !== undefined;
};

export default useAuth;
