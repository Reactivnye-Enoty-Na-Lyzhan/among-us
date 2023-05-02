import { type ChangeEventHandler, memo, useCallback, useState } from 'react';
import type { FC, InputHTMLAttributes } from 'react';
import './PostRatingForm.css';

import { useUpdateRating } from './usePostRating';
import {
  EnumRatingEntityIdentifiers,
  EnumRatingTypes,
} from '@/store/api/leaderboard/constants';

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
  const { postRatingHandler, queryStatusMessage } = useUpdateRating();

  return (
    <div className="leaderboard_add-card-modal">
      <form className="leaderboard-add-card-form" onSubmit={postRatingHandler}>
        <FormField
          label="RatingID"
          name={EnumRatingEntityIdentifiers.RATING_ID}></FormField>
        <FormField
          label="Лучший счёт"
          name={EnumRatingTypes.MAX_SCORE}></FormField>
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
