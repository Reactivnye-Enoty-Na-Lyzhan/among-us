import { FC, memo } from 'react';
import classNames from 'classnames';
import {
  CheckInputValidityType,
  HandleChangeType,
} from '@/hooks/useParamsValidation.types';
import './GameName.css';

type Props = {
  value: string;
  validity: boolean;
  onChange: HandleChangeType;
  onBlur: CheckInputValidityType;
};

const GameName: FC<Props> = props => {
  const { value, validity, onChange, onBlur } = props;

  const gameNameClass = classNames('create-game__input', {
    'create-game__input_type_error': !validity,
  });

  return (
    <label className="create-game__game-name">
      <span className="create-game__input-title">
        Осталось придумать название игры
      </span>
      <input
        className={gameNameClass}
        type="text"
        name="title"
        minLength={3}
        maxLength={30}
        placeholder="Название"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </label>
  );
};

export default memo(GameName);
