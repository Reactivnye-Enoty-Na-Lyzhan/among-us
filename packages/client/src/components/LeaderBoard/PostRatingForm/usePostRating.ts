import type { PostRatingRequestArgs } from '@/store/api/leaderboard/endpoints/postRating';
import { EnumRatingEntityIdentifiers } from '@/store/api/leaderboard/constants';
import { usePostRatingMutation } from '@/store/api/leaderboard/leaderboard.api.slice';

import { selectUserLogin } from '@/store/auth/selectors';
import { type FormEventHandler, useCallback } from 'react';
import { useSelector } from 'react-redux';

export function useUpdateRating() {
  const [sendPostRatingQuery, postRatingQuery] = usePostRatingMutation();
  const userLogin = useSelector(selectUserLogin) || '';

  const postRatingHandler: FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formDataObject = formDataToObject(formData) as Omit<
        PostRatingRequestArgs,
        EnumRatingEntityIdentifiers.USER_LOGIN
      >;

      const requestData = { ...formDataObject, userLogin };
      console.log(`FORM DATA; ${JSON.stringify(requestData)}`);

      sendPostRatingQuery(requestData);
    },
    []
  );

  let queryStatusMessage = '';
  if (postRatingQuery.isSuccess) {
    queryStatusMessage = 'Рейтинг загружен на сервер';
  } else if (postRatingQuery.isError) {
    queryStatusMessage = 'Не удалось отправить на сервер';
  } else if (postRatingQuery.isLoading) {
    queryStatusMessage = 'Загрузка на сервер...';
  }

  return { postRatingHandler, queryStatusMessage };
}

function formDataToObject(formData: FormData) {
  const dataObject = {} as Record<string, unknown>;

  for (const [field, value] of formData) {
    let formValue: string | number = value as string;

    if (typeof value === 'string') {
      const intParsedValue = parseInt(value);
      if (intParsedValue) {
        formValue = intParsedValue;
      }
    }

    dataObject[field] = formValue;
  }

  return dataObject;
}
