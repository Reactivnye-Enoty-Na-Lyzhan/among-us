import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames';
import './Input.css';
import { EnumFormInputType } from './enums';
import { WithRendersCounter } from '@/utils/hocs/WithRendersCounter';
import { type TFormContextValue } from '../typings';

import type { Props } from './typings';

const Input: FC<Props> = props => {
  const { label, type, validators, name } = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [input, setInput] = useState({ value: '', validationError: '' });
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
    setInput({ value: inputValue, validationError });

    console.log(`PROPS: ${JSON.stringify(Object.keys(props))}`);
    console.log(`CONTEXT: ${JSON.stringify(formContext)}`);
  };

  return (
    <label
      className={classNames('form-input', 'form__form-input', {
        'form-input_invalid': !!input.validationError,
      })}>
      <span className="form-input__label">{label}</span>
      <input
        type={type}
        className="form-input__input"
        value={input.value}
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
      <div
        className="form-input__validation"
        title={validation?.isValid === false ? validation?.text : undefined}>
        {validation?.isValid === false ? validation?.text : undefined}
      </div> */}
    </label>
  );
};

export default WithRendersCounter(Input);
