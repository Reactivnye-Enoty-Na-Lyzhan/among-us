import React, { useState } from 'react';
import './style.css';

type Props = {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  required: boolean;
  value?: string;
  handleInputChange: (name: string, value?: string) => void;
};

export default function Input({
  handleInputChange,
  label,
  value,
  type,
  ...props
}: Props) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="form-input">
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
    </div>
  );
}
