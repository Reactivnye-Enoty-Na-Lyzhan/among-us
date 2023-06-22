import { useSignInUserMutation } from '@/store/auth/auth.slice';
import { SignInRequestDTO } from '@/store/auth/auth.types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';

type IResponseError = FetchBaseQueryError & {
  status: number;
  data: {
    message: string;
  };
};

export function useSignIn() {
  const [sendSignInQuery, sendSignInQueryStatus] = useSignInUserMutation();
  const [requestStatus, setRequestStatus] = useState('');
  const [statusMessageClass, setStatusMessageClass] = useState('');

  async function signIn(data: SignInRequestDTO) {
    setStatusMessageClass('');
    setRequestStatus('Проверяем...');
    try {
      const response = await sendSignInQuery(data);

      if ('data' in response) {
        setStatusMessageClass('login-page__status_green');
        setRequestStatus('Рады видеть снова!');
        return true;
      }

      if ('error' in response) {
        const { data } = response.error as IResponseError;
        const { message } = data;
        setRequestStatus(message);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return {
    requestStatus,
    statusMessageClass,
    signIn,
    sendSignInQueryStatus,
  };
}
