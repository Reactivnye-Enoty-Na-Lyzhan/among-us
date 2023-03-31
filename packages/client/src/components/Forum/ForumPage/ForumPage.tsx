import React from 'react';
import Header from '../../Header/Header';
import './ForumPage.css';

export default function () {
  return (
    <div className="forum">
      <Header title={'Форум'} />
      <div className="forum__container"></div>
    </div>
  );
}
