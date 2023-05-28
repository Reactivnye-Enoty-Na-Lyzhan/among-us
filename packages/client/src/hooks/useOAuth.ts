import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLazyGetServiceIdQuery } from '../store/auth/oauth.slice';
import { useYandexOAuthMutation } from '../store/auth/oauth.slice';
import { useLazyGetUserQuery } from '../store/auth/auth.slice';
import { getRedirectUrl } from '../utils/oauth/getRedirectUrl';
import { redirectToOAuthYandex } from '../utils/oauth/redirectToOAuthYandex';

const useOAuth = () => {
  const [getServiceId] = useLazyGetServiceIdQuery();
  const [yandexOAuth] = useYandexOAuthMutation();
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
    try {
      const { data } = await getServiceId();
      const serviceId = data?.service_id;
      serviceId && redirectToOAuthYandex(serviceId);
    } catch (error) {
      console.log(`Oops, ${error} `);
    }
  }, [getServiceId]);

  const requestToken = useCallback(async () => {
    try {
      const { isSuccess } = await yandexOAuth({
        code,
        redirect_uri: getRedirectUrl(),
      }).unwrap();
      if (!isSuccess) return;
      const user = await getUser();
      if (user) navigate('/game');
    } catch (error) {
      console.log(`Oops, ${error} `);
    }
  }, [code, yandexOAuth, navigate, getUser]);

  return { handleOAuthSignIn, requestToken };
};

export default useOAuth;
