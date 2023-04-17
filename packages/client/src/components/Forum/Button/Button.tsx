import React, { FC } from 'react';
import './Button.css';

type Props = {
  text: string;
  handleOnClick: () => void;
};

const ForumButton: FC<Props> = ({ text, handleOnClick }) => {
  return (
    <button type="button" onClick={handleOnClick} className="forum-button">
      {text}
    </button>
  );
};

export default ForumButton;
