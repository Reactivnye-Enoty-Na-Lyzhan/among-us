import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

type Props = {
  title: string;
  goBackUrl: string;
};

export default function Header({ title, goBackUrl }: Props) {
  return (
    <header className="page-header">
      <Link className="page-header__go-back" to={goBackUrl}></Link>
      <div className="page-header__title">{title}</div>
    </header>
  );
}
