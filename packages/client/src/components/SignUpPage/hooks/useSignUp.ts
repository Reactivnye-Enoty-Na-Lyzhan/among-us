import {
  useLazyGetUserQuery,
  useSignUpUserMutation,
} from '@/store/auth/auth.slice';
import { APIErrorResponse } from '@/store/auth/auth.types';
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
  const [sendGetUserQuery, getUserQueryStatus] = useLazyGetUserQuery();

  const signUpWrapper = useCallback(async (formData: SignUpFormData) => {
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
  }, []);

  const getUserWrapper = useCallback(async () => {
    try {
      await sendGetUserQuery();
    } catch (error) {
      console.error(`ERROR WHILE GET USER: ${error}`);
      setAPIQueryStatusMessage('Непредвиденная ошибка клиента');
    }
  }, []);

  return {
    apiQueryStatusMessage,
    sendSignUpQuery: signUpWrapper,
    getUserQueryStatus,
    sendGetUserQuery: getUserWrapper,
    signUpQueryStatus,
  };
}
