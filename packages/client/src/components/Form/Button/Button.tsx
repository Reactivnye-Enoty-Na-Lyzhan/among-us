import React, { FC, memo } from 'react';
import './Button.css';

type Props = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

const Button: FC<Props> = ({ text, disabled, onClick }) => {
  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default memo(Button);
