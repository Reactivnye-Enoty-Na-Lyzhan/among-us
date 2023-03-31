import React from 'react';
import Header from '../../Header/Header';
import './Page.css';

export default function () {
  return (
    <div className="forum">
      <Header title={'Форум'} goBackUrl={'/'} />
      <div className="forum__container"></div>
    </div>
  );
}
