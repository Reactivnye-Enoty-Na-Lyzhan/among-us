import { type ChangeEventHandler, memo, useCallback, useState } from 'react';
import type { FC, FormEventHandler, InputHTMLAttributes } from 'react';
import './AddCardForm.css';
import { usePostRatingMutation } from '@/store/api/leaderboard/leaderboard.slice';

import {
  EnumRatingEntityIdentifiers,
  EnumRatingTypes,
  PostRatingRequestArgs,
} from '@/store/api/leaderboard/leaderboard.types';

type FormFieldValue = string | number;
type FormFieldProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: EnumRatingEntityIdentifiers | EnumRatingTypes;
  label: string;
  initValue?: FormFieldValue;
};

const FormField: FC<FormFieldProps> = ({
  name,
  label,
  type = 'number',
  initValue = 1,
}) => {
  const [value, setValue] = useState<FormFieldValue>(initValue);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => setValue(event.currentTarget.value),
    []
  );

  return (
    <label className="leaderboard-add-card-field">
      <span className="leaderboard-add-card-field__name">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className="leaderboard-add-card-field__input"></input>
    </label>
  );
};

const AddCardForm: FC = () => {
  const [sendPostRatingQuery, postRatingQuery] = usePostRatingMutation();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = formDataToObject(formData) as PostRatingRequestArgs;
    console.log(`FORM DATA; ${JSON.stringify(requestData)}`);

    sendPostRatingQuery(requestData);
  }, []);

  let queryStatusMessage = '';
  if (postRatingQuery.isSuccess) {
    queryStatusMessage = 'Рейтинг загружен на сервер';
  } else if (postRatingQuery.isError) {
    queryStatusMessage = 'Не удалось отправить на сервер';
  } else if (postRatingQuery.isLoading) {
    queryStatusMessage = 'Загрузка на сервер...';
  }

  return (
    <div className="leaderboard_add-card-modal">
      <form className="leaderboard-add-card-form" onSubmit={onSubmit}>
        <FormField
          label="RatingID"
          name={EnumRatingEntityIdentifiers.RATING_ID}
          initValue={1}></FormField>
        <FormField
          label="UserID"
          name={EnumRatingEntityIdentifiers.USER_ID}></FormField>
        <FormField label="Рейтинг" name={EnumRatingTypes.RANK}></FormField>
        <FormField label="Победы" name={EnumRatingTypes.WINRATE}></FormField>
        <FormField
          label="Количество игр"
          name={EnumRatingTypes.GAMES}></FormField>
        <button type="submit" className="leaderboard__functional-button">
          Отправить
        </button>
        <div className="leaderboard__post-rating-status">
          {queryStatusMessage}
        </div>
      </form>
    </div>
  );
};
export default memo(AddCardForm);

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
