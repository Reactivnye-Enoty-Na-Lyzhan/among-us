import {
  useLazyGetUserQuery,
  useSignUpUserMutation,
} from '@/store/auth/auth.slice';
import { useCallback, useState } from 'react';
import { SignUpFormData } from '../_types';
import { transformFormDataToDTO } from '../_utils/transformFormDataToDTO';
import {
  isRTKQueryFetchError,
  isRTKQuerySuccessfulResponse,
} from '@/utils/api/response-types';
import { APIErrorResponse } from '@/store/auth/auth.types';
import { getErrorMessage } from '@/utils/api/signup/error-messages/get-error-message';

export function useOnSubmitQueries() {
  const [apiQueryStatusMessage, setAPIQueryStatusMessage] = useState<
    string | null
  >(null);
  const [sendGetUserQuery, getUserQueryStatus] = useLazyGetUserQuery();
  const [sendSignUpQuery, signUpQueryStatus] = useSignUpUserMutation();

  const signUpWrapper = useCallback(async (formData: SignUpFormData) => {
    const signUpDTO = transformFormDataToDTO(formData);
    console.log(`FORM DATA: ${JSON.stringify(formData)}`);
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
        const errorMessage = getErrorMessage({ status, response });

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
