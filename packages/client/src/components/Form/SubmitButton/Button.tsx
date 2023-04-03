import React from 'react';
import './Button.css';

type Props = {
  label: string;
  disabled: boolean;
};

const Button: React.FC<Props> = ({ label, disabled }) => {
  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
