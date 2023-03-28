import React, { useState } from 'react';
import { ValidationData } from '../hooks';
import './style.css';

type Props = {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  required: boolean;
  value?: string;
  validation?: ValidationData;
  handleInputChange: (name: string, value?: string) => void;
};

export default function Input({
  handleInputChange,
  label,
  value,
  type,
  validation,
  ...props
}: Props) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div
      className={`form-input ${
        validation?.isValid === false ? 'form-input_invalid' : ''
      }`}>
      <label>{label}</label>
      <input
        {...props}
        type={
          type === 'password'
            ? passwordVisibility
              ? 'text'
              : 'password'
            : type
        }
        value={value ?? ''}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          handleInputChange(props.name, e.currentTarget.value);
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
      {validation?.isValid === false ? (
        <div className="form-input__validation">{validation?.text}</div>
      ) : null}
    </div>
  );
}
