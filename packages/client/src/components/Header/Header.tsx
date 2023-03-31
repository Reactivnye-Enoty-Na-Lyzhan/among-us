import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

type Props = {
  title: string;
  goBackUrl: string;
};

export default function Header({ title, goBackUrl }: Props) {
  return (
    <div className="header">
      <Link className="header__go-back" to={goBackUrl}></Link>
      <div className="header__title">{title}</div>
    </div>
  );
}
