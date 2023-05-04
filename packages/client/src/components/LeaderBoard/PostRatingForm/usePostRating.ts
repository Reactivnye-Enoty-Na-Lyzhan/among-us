import { usePostRatingMutation } from '@/store/api/leaderboard/leaderboard.api.slice';
import type { PostRatingRequestArgs } from '@/store/api/leaderboard/leaderboard.api.types';
import { selectUserLogin } from '@/store/auth/selectors';
import { EnumRatingEntityIdentifiers } from '@-constants/leaderboard/ratings.constants';
import { useCallback, type FormEventHandler } from 'react';
import { useSelector } from 'react-redux';

export function useUpdateRating() {
  const [sendPostRatingQuery, postRatingQuery] = usePostRatingMutation();
  const userLogin = useSelector(selectUserLogin) || '';

  const postRatingHandler: FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formDataObject = formDataToObject(formData);

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

type FormDataObject = Omit<
  PostRatingRequestArgs,
  EnumRatingEntityIdentifiers.USER_LOGIN
>;
function formDataToObject(formData: FormData): FormDataObject {
  const dataObject = {} as FormDataObject;

  for (const [field, formValue] of formData) {
    const intParsedValue = parseInt(formValue as string);
    dataObject[field as keyof FormDataObject] = intParsedValue;
  }

  return dataObject;
}
