import React, { FC } from 'react';
import './Button.css';

type Props = {
  text: string;
  disabled: boolean
};

const ForumButton: FC<Props> = ({ text, disabled }) => {
  return (
    <button type="button" disabled={disabled} className="forum-button">
      {text}
    </button>
  );
};

export default ForumButton;
