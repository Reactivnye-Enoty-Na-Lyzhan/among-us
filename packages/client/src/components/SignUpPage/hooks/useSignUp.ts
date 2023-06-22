import {
  useSignInUserMutation,
  useSignUpUserMutation,
} from '@/store/auth/auth.slice';
import type {
  APIErrorResponse,
  SignInRequestDTO,
} from '@/store/auth/auth.types';
import { getSignupAPIErrorMessage } from '@/utils/api/errors/signup/getErrorMessage';
import {
  isRTKQueryFetchError,
  isRTKQuerySuccessfulResponse,
} from '@/utils/api/responseTypes';
import { useCallback, useState } from 'react';
import { SignUpFormData } from '../types';
import { transformFormDataToDTO } from '../utils/transformFormDataToDTO';

export function useOnSubmitQueries() {
  const [apiQueryStatusMessage, setAPIQueryStatusMessage] = useState<
    string | null
  >(null);
  const [sendSignUpQuery, signUpQueryStatus] = useSignUpUserMutation();
  const [sendSignInQuery, signInQueryStatus] = useSignInUserMutation();

  const sendSignUpQueryWrapper = useCallback(
    async (formData: SignUpFormData) => {
      const signUpDTO = transformFormDataToDTO(formData);
      try {
        const response = await sendSignUpQuery(signUpDTO);
        if (isRTKQuerySuccessfulResponse(response)) {
          setAPIQueryStatusMessage('Регистрация прошла успешно');
          return;
        }

        const { error } = response;
        if (isRTKQueryFetchError(error)) {
          const { status } = error;
          const response = error.data as APIErrorResponse;
          const errorMessage = getSignupAPIErrorMessage({ status, response });

          setAPIQueryStatusMessage(errorMessage);
        } else {
          throw error;
        }
      } catch (error) {
        console.error(`ERROR WHILE SIGNUP REQUEST: ${JSON.stringify(error)}`);
        setAPIQueryStatusMessage('Непредвиденная ошибка клиента');
      }
    },
    []
  );

  const sendSignInQueryWrapper = useCallback(
    async (signInData: SignInRequestDTO) => {
      try {
        const response = await sendSignInQuery(signInData);

        if (!isRTKQuerySuccessfulResponse(response)) {
          const { error } = response;

          if (isRTKQueryFetchError(error)) {
            setAPIQueryStatusMessage(`${error?.data}`);
          }
        }
      } catch (error) {
        console.error(`ERROR WHILE SIGNIN USER: ${error}`);
        setAPIQueryStatusMessage('Непредвиденная ошибка клиента');
      }
    },
    []
  );

  return {
    apiQueryStatusMessage,
    sendSignUpQuery: sendSignUpQueryWrapper,
    signUpQueryStatus,
    sendSignInQuery: sendSignInQueryWrapper,
    signInQueryStatus,
  };
}
