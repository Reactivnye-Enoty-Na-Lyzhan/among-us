import React, { FC } from 'react';
import './Button.css';

type Props = {
  text: string;
};

const GroupButton: FC<Props> = ({ text }) => {
  return <button className="theme-group-button">{text}</button>;
};

export default GroupButton;
