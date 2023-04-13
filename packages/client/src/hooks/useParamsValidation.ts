import { useCallback, useEffect, useState } from 'react';
import { gameNamePattern, InputsParamsType, DefaultValidityStateType } from '@/utils/gameParams';
import {
  Props,
  UseParamsValidationType,
  ControlParamType,
  HandleChangeType,
  CheckInputValidityType,
  ResetValuesType,
} from './useParamsValidation.types';

// Хук валидации параметров игры
const useParamsValidation = (props: Props): UseParamsValidationType => {
  const {
    defaultValues,
    defaultValidityState,
  } = props;

  const [values, setValues] = useState<InputsParamsType>(defaultValues);
  const [inputsValidity, setInputsValidity] = useState<DefaultValidityStateType>(defaultValidityState);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Обновление валидации формы
  useEffect(() => {
    setIsFormValid(
      !Object.values(inputsValidity).some(input => input === false)
    );
  }, [inputsValidity]);

  // Обработчик поля ввода
  const handleChange: HandleChangeType = useCallback((evt) => {
    const { target } = evt;
    const { name, value } = target;
    if (name !== 'title' && value !== '' && !Number(value)) return;
    setValues((inputValues) => ({ ...inputValues, [name]: value }));
  }, []);

  // Обработчик клика уменьшения значения
  const handleDecrease: ControlParamType = useCallback((name, value, min, max) => {
    // Если значение уже меньше или равно минимуму, запретить уменьшение
    if (+value <= min) return;

    setValues(inputValues => ({ ...inputValues, [name]: (+value - 1).toString() }));
    setInputsValidity((inputs) => ({
      ...inputs,
      [name]: +value - 1 >= min && +value - 1 <= max,
    }));
  }, []);

  // Обработчик клика увеличения значения
  const handleIncrease: ControlParamType = useCallback((name, value, min, max) => {
    // Если значение уже больше или равно максимум, запретить увеличение

    if (+value >= max) return;

    setValues(inputValues => ({ ...inputValues, [name]: (+value + 1).toString() }));
    setInputsValidity(inputs => ({
      ...inputs,
      [name]: +value + 1 >= min && +value + 1 <= max,
    }));
  }, []);

  // Проверка валидности поля ввода
  const checkInputValidity: CheckInputValidityType = useCallback((evt) => {
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
  }, []);

  // Сброс значений форму к изначальным
  const resetValues: ResetValuesType = useCallback(() => {
    setValues(defaultValues);
    setInputsValidity(defaultValidityState);
  }, []);

  return {
    values,
    inputsValidity,
    isFormValid,
    handleChange,
    handleIncrease,
    handleDecrease,
    checkInputValidity,
    resetValues,
  };
};

export default useParamsValidation;
