import React from 'react';
import './Header.css';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <div className="header">
      <div className="header__title">{title}</div>
    </div>
  );
}
