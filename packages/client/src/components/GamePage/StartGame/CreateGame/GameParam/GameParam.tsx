import { FC, memo } from 'react';
import classNames from 'classnames';
import { CheckInputValidityType, ControlParamType, HandleChangeType } from '@/hooks/useParamsValidation.types';
import { GameParamsType } from '../../../../../utils/gameParams';
import './GameParam.css';

type Props = GameParamsType & {
  inputValue: string,
  validity: boolean,
  onChange: HandleChangeType,
  onBlur: CheckInputValidityType,
  onIncrease: ControlParamType,
  onDecrease: ControlParamType,
};

// Параметр настройки игры
const GameParam: FC<Props> = props => {
  const {
    title,
    name,
    min,
    max,
    rangeUnit,
    inputValue,
    validity,
    onChange,
    onBlur,
    onIncrease,
    onDecrease,
  } = props;

  const paramControlsClass = classNames('create-game__param-controls', {
    'create-game__param-controls_invalid': !validity,
  });

  const increaseValue = () => {
    onIncrease(name, inputValue, min, max);
  };

  const decreaseValue = () => {
    onDecrease(name, inputValue, min, max);
  };

  return (
    <li className="create-game__game-param">
      <div className="create-game__param-container">
        <span className="create-game__param-title">{title}:</span>
        <div className={paramControlsClass}>
          <button
            className="create-game__control"
            type="button"
            onClick={decreaseValue}>
            -
          </button>
          <input
            className="create-game__param-value"
            type="text"
            inputMode="numeric"
            name={name}
            min={min}
            max={max}
            minLength={1}
            maxLength={2}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <button
            className="create-game__control"
            type="button"
            onClick={increaseValue}>
            +
          </button>
        </div>
      </div>
      <span className="create-game__param-range">{`от ${min} до ${max} ${rangeUnit}`}</span>
    </li>
  );
};

export default memo(GameParam);
