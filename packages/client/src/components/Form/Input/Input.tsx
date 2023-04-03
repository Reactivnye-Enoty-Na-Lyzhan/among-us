import React, { FC, useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './Input.css';
import { EnumFormInputType } from './enums';
import { type TFormContextValue } from '../typings';

import type { TFormInputProps as Props } from './typings';

const Input: FC<Props> = props => {
  const { label, type, validators, name } = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inputState, setInputState] = useState({
    value: '',
    validationError: '',
  });
  const formContext: TFormContextValue = useContext(props.context);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
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

  const displayName = props.displayName?.toUpperCase();
  console.log(`RENDER ${displayName}`);
  console.log(`STATE: ${JSON.stringify(inputState)}`);
  console.log(`CONTEXT: ${JSON.stringify(formContext)}`);

  return (
    <label
      className={classNames('form-input', 'form__form-input', {
        'form-input_invalid': !!inputState.validationError,
      })}>
      <span className="form-input__label">{label}</span>
      <input
        type={type}
        className="form-input__input"
        onChange={onChangeHandler}
        // onBlur={() => {
        //   if (validateField) {
        //     validateField(name, value);
        //   }
        // }}
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
      {inputState.validationError !== '' && (
        <div className="form-input__validation">
          {inputState.validationError}
        </div>
      )}
    </label>
  );
};

export default Input;
