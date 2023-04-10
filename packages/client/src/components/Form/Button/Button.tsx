import React, { FC, memo } from 'react';
import './Button.css';

type Props = {
  text: string;
  disabled: boolean;
};

const Button: FC<Props> = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={disabled}>
      {text}
    </button>
  );
};

export default memo(Button);
