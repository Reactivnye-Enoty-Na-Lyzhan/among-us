import React from 'react';
import './style.css';

type Props = {
  text: string;
};

export default function Button({ text }: Props) {
  return (
    <button type="submit" className="form-button form__form-button">
      {text}
    </button>
  );
}
