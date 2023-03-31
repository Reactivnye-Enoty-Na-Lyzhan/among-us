import React, { FC, useState } from 'react';
import { ValidationData } from '../../../hooks/useValidation';
import './Input.css';

type Props = {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  value?: string;
  validation?: ValidationData;
  handleInputChange: (name: string, value?: string) => void;
  validateField?: (field: string, value?: string) => void;
  clearFieldValidation?: (field: string) => void;
};

const Input: FC<Props> = ({
  handleInputChange,
  validateField,
  clearFieldValidation,
  label,
  value,
  type,
  validation,
  ...props
}: Props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <label
      className={`form-input form__form-input ${
        validation?.isValid === false ? 'form-input_invalid' : ''
      }`}>
      <span className="form-input__label">{label}</span>
      <input
        {...props}
        type={
          type === 'password'
            ? passwordVisibility
              ? 'text'
              : 'password'
            : type
        }
        className="form-input__input"
        value={value ?? ''}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          handleInputChange(props.name, e.currentTarget.value);
          if (clearFieldValidation) {
            clearFieldValidation(props.name);
          }
        }}
        onBlur={() => {
          if (validateField) {
            validateField(props.name, value);
          }
        }}
      />
      {type === 'password' && value ? (
        <div
          className={`form-input__visibility ${
            passwordVisibility ? '' : 'form-input__visibility_show'
          }`}
          onClick={() => {
            setPasswordVisibility(!passwordVisibility);
          }}></div>
      ) : null}
      <div
        className="form-input__validation"
        title={validation?.isValid === false ? validation?.text : undefined}>
        {validation?.isValid === false ? validation?.text : undefined}
      </div>
    </label>
  );
};

export default Input;
