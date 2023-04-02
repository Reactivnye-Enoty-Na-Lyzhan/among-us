import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

type Props = {
  title: string;
  goBackUrl: string;
};

const Header: FC<Props> = ({ title, goBackUrl }) => {
  return (
    <header className="page-header">
      <Link className="page-header__go-back" to={goBackUrl}></Link>
      <div className="page-header__title">{title}</div>
    </header>
  );
};

export default Header;
