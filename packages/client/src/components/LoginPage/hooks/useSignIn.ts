import { useState } from 'react';
import { useSignInUserMutation } from '@/store/auth/auth.slice';
import {
  isRTKQueryFetchError,
  isRTKQuerySuccessfulResponse,
} from '@/utils/api/response-types';
import { APIErrorResponse, SignInRequestDTO } from '@/store/auth/auth.types';
import { getErrorMessage } from '@/utils/api/signup/error-messages/get-error-message';

export function useSignIn() {
  const [sendSignInQuery, sendSignInQueryStatus] = useSignInUserMutation();
  const [requestStatus, setRequestStatus] = useState('');
  const [statusMessageClass, setStatusMessageClass] = useState('');

  async function signIn(data: SignInRequestDTO) {
    setStatusMessageClass('');
    setRequestStatus('Проверяем...');
    try {
      const response = await sendSignInQuery(data);
      if (isRTKQuerySuccessfulResponse(response)) {
        setStatusMessageClass('login-page__status_green');
        setRequestStatus('Рады видеть снова!');
        return true;
      }
      const { error } = response;
      if (isRTKQueryFetchError(error)) {
        const { status } = error;
        let errorMessage;
        if (status === 401) {
          errorMessage = 'Неверный логин или пароль';
        } else {
          const response = error.data as APIErrorResponse;
          errorMessage = getErrorMessage({ status, response });
        }
        setStatusMessageClass('login-page__status_red');
        setRequestStatus(errorMessage);
        return false;
      } else {
        throw error;
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
