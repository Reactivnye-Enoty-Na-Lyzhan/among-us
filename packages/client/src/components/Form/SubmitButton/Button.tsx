import React, { useState } from 'react';
import { SubmitButtonProps } from './_typings';
import './Button.css';

export const FormSubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  componentRef,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={isDisabled}>
      {label}
    </button>
  );
};
