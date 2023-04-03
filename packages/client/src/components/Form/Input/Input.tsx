import React, { FC, useContext, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import './Input.css';
// import { EnumFormInputType } from './enums';
import { type TFormContextValue } from '../typings';

import type { TFormInputProps as Props } from './typings';

const Input: FC<Props> = props => {
  const {
    name,
    label,
    context,
    componentRef,
    validators,
    debugName,
    ...htmlProps
  } = props;
  // const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inputState, setInputState] = useState({
    value: '',
    validationError: '',
  });
  const formContext: TFormContextValue = useContext(context);

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

  const validationHandler = (e: React.FormEvent<HTMLInputElement>) => {
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

  return (
    <label
      className={classNames('form-input', 'form__form-input', {
        'form-input_invalid': !!inputState.validationError,
      })}>
      <span className="form-input__label">{label}</span>
      <input
        className="form-input__input"
        name={name}
        onChange={validationHandler}
        onBlur={validationHandler}
        {...htmlProps}
      />
      {/* {type === EnumFormInputType.password && value ? (
        <div
          className={classNames('form-input__visibility', {
            'form-input__visibility_show': passwordVisibility,
          })}
          onClick={() => {
            setPasswordVisibility(!passwordVisibility);
          }}></div>
      ) : null}
        > */}
      <div className="form-input__validation">{inputState.validationError}</div>
    </label>
  );
};

export default Input;
