import React, { FC, useContext, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import './Input.css';
import { type FormContextValue } from '../_typings';

import type { FormInputProps as Props } from './_typings';

export const FormInput: FC<Props> = props => {
  const {
    name,
    label,
    children,
    context,
    componentRef,
    validators,
    debugName,
    ...htmlProps
  } = props;

  const [inputState, setInputState] = useState({
    value: '',
    validationError: '',
  });
  const formContext: FormContextValue = useContext(context);

  const validateInputValue = (inputValue: string) => {
    let validationError = '';
    validators?.some(validator => {
      validationError = validator(inputValue);
      return validationError !== '';
    });

    formContext.inputsValues[name] = {
      value: inputValue,
      isValid: !validationError,
    };
    setInputState({ value: inputValue, validationError });
  };

  const onEventValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    validateInputValue(inputValue);
  };

  useImperativeHandle(
    componentRef,
    () => {
      return {
        validateField(inputValue: string) {
          console.log(`VALIDATE ${debugName?.toUpperCase()} '${inputValue}'`);
          validateInputValue(inputValue);
        },
      };
    },
    []
  );

  console.log(`RENDER ${debugName?.toUpperCase()}`);
  console.log(`STATE: ${JSON.stringify(inputState)}`);
  console.log(`CONTEXT: ${JSON.stringify(formContext)}`);
  console.log('-'.repeat(50));

  return (
    <label
      className={classNames('form-input', 'form__form-input', {
        'form-input_invalid': !!inputState.validationError,
      })}>
      <span className="form-input__label">{label}</span>
      <input
        className="form-input__input"
        name={name}
        onChange={onEventValidationHandler}
        onBlur={onEventValidationHandler}
        {...htmlProps}
      />
      <div className="form-input__validation">{inputState.validationError}</div>
      {children}
    </label>
  );
};
