import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redirectToOAuthYandex } from '@/utils/oauth/redirectToOAuthYandex';
import { useGetTokenMutation } from '../store/auth/oauth.slice';
import { useLazyGetUserQuery } from '../store/auth/auth.slice';

const useOAuth = () => {
  const [getToken] = useGetTokenMutation();
  const [getUser] = useLazyGetUserQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState('');

  useEffect(() => {
    const newCode = searchParams.get('code');
    if (newCode) {
      setCode(newCode);
    }
  }, [searchParams]);

  const handleOAuthSignIn = useCallback(async () => {
    redirectToOAuthYandex();
  }, []);

  const requestToken = useCallback(async () => {
    try {
      if (code) {
        const token = await getToken({ code });
        if ('error' in token) {
          throw new Error('Ошибка! Код не подходит');
        }
        const user = await getUser();
        if ('data' in user) {
          navigate('/game');
        }
      }
    } catch (error) {
      console.log(`Oops, ${error} `);
    }
  }, [code]);

  return { handleOAuthSignIn, requestToken };
};

export default useOAuth;
