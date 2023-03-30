import React from 'react';
import './Button.css';

type Props = {
  text: string;
  disabled: boolean;
};

export default function Button({ text, disabled }: Props) {
  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={disabled}>
      {text}
    </button>
  );
}
