import React, { FC } from 'react';
import './Button.css';

type Props = {
  text: string;
  onClick: () => void;
};

const GroupButton: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="theme-group-button"
      type="button"
      onClick={() => {
        onClick();
      }}>
      {text}
    </button>
  );
};

export default GroupButton;
