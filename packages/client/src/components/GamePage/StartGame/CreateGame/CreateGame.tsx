import { FC, memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import GameParam from './GameParam/GameParam';
import {
  defaultValidityState,
  gameNamePattern,
  gameParams,
  inputDefaultValues,
} from '../../../../utils/gameParams';
import './CreateGame.css';

type Props = {
  onStart: () => void;
};

// Создание новой игры
const CreateGame: FC<Props> = props => {
  const { onStart } = props;

  const [formStep, setFormStep] = useState<number>(1);
  const [inputsValues, setInputsValues] =
    useState<Record<string, string>>(inputDefaultValues);
  const [inputsValidity, setInputsValidity] =
    useState<Record<string, boolean>>(defaultValidityState);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const navigate = useNavigate();

  // Обновление валидации формы
  useEffect(() => {
    setIsFormValid(
      !Object.values(inputsValidity).some(input => input === false)
    );
  }, [inputsValidity]);

  const heading =
    formStep === 1 ? 'Установите параметры игры' : 'Вы почти готовы';

  const gameNameClass = classNames('create-game__input', {
    'create-game__input_type_error': !inputsValidity.title,
  });

  // Создание игры
  const createGame = () => {
    // Действия для создания игры
    setIsProcessing(false);
    onStart();
    navigate('../assembling');
  };

  // Обработчик поля ввода
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { name, value } = target;
    if (name !== 'title' && value !== '' && !Number(value)) return;
    setInputsValues({ ...inputsValues, [name]: value });
  };

  // Обработчик клика уменьшения значения
  const handleDecreaseParam = (
    name: string,
    value: string,
    min: number,
    max: number
  ) => {
    // Если значение уже меньше или равно минимуму, запретить уменьшение
    if (Number(inputsValues[name]) <= min) return;

    setInputsValues(values => ({ ...values, [name]: (+value - 1).toString() }));
    setInputsValidity(inputs => ({
      ...inputs,
      [name]: +value - 1 >= min && +value - 1 <= max,
    }));
  };

  // Обработчик клика увеличения значения
  const handleIncreaseParam = (
    name: string,
    value: string,
    min: number,
    max: number
  ) => {
    // Если значение уже больше или равно максимум, запретить увеличение
    if (Number(inputsValues[name]) >= max) return;

    setInputsValues(values => ({ ...values, [name]: (+value + 1).toString() }));
    setInputsValidity(inputs => ({
      ...inputs,
      [name]: +value + 1 >= min && +value + 1 <= max,
    }));
  };

  // Проверка валидности поля ввода
  const checkInputValidity = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { name, value, min, max } = target;

    if (name === 'title') {
      setInputsValidity(inputs => ({
        ...inputs,
        [name]: target.validity.valid && gameNamePattern.test(value),
      }));
      return;
    }

    setInputsValidity(inputs => ({
      ...inputs,
      [name]: target.validity.valid && +value <= +max && +value >= +min,
    }));
  };

  // Обработчик кнопки перехода по форме
  const handleNextButton = () => {
    if (formStep === 1) {
      setFormStep(2);
      return;
    }
    setIsProcessing(true);
    createGame();
  };

  // Сброс значений форму к изначальным
  const handleResetValue = () => {
    setInputsValues(inputDefaultValues);
    setInputsValidity(defaultValidityState);
  };

  // Обработчик формы
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    createGame();
  };

  // Содержимое формы в зависимости от шага
  const generateFormContent = (): JSX.Element => {
    switch (formStep) {
      case 1:
        return (
          <>
            <ul className="create-game__params">
              {gameParams.map(gameParam => (
                <GameParam
                  key={gameParam.name}
                  title={gameParam.title}
                  name={gameParam.name}
                  min={gameParam.min}
                  max={gameParam.max}
                  rangeUnit={gameParam.rangeUnit}
                  inputValue={inputsValues[gameParam.name]}
                  onChange={handleInputChange}
                  onIncrease={handleIncreaseParam}
                  onDecrease={handleDecreaseParam}
                  onBlur={checkInputValidity}
                  validity={inputsValidity[gameParam.name]}
                />
              ))}
            </ul>
            <button
              className="create-game__reset-params"
              onClick={handleResetValue}
              type="button">
              Сбросить настройки
            </button>
          </>
        );
      case 2:
        return (
          <label className="create-game__form-field">
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
              value={inputsValues.title}
              onChange={handleInputChange}
              onBlur={checkInputValidity}
              required
            />
          </label>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="create-game create-game_spacing_outer">
      <h1 className="create-game__title">{heading}</h1>
      <div className="create-game__container">
        <div className="create-game__crewman"></div>
        {formStep === 2 && (
          <button
            className="create-game__form-navigation"
            type="button"
            onClick={() => setFormStep(1)}>
            <span className="create-game__button-icon"></span>
            <span className="create-game__button-title">Назад</span>
          </button>
        )}
        <form
          className="create-game__form"
          onSubmit={handleFormSubmit}
          noValidate>
          <div className="create-game__form-container">
            {generateFormContent()}
          </div>
        </form>
        <button
          className="create-game__form-navigation create-game__form-navigation_action_next"
          disabled={!isFormValid}
          type="button"
          onClick={handleNextButton}>
          <span className="create-game__button-title">Создать игру</span>
          <span className="create-game__button-icon create-game__button-icon_action_next"></span>
        </button>
      </div>
      <Link to=".." className="create-game__leave-game">
        Вернуться в меню
      </Link>
    </div>
  );
};

export default memo(CreateGame);
