import React, { FC } from 'react';
import ForumButton from '../../Button/Button';
import './Empty.css';

const ForumEmpty: FC = () => {
  return (
    <div className="forum-themes-empty">
      <div className="forum-themes-empty__container">
        <h1 className="forum-themes-empty__title">
          Тем еще нет, но вы можете это исправить!
        </h1>
        <div className="forum-themes-empty__text">
          К примеру, вы знаете, как выключить звук в игре?
          <br />
          <b>Создайте тему и получите ответ от других игроков!</b>
        </div>
        <div className="forum-themes-empty__button">
          <ForumButton
            text="Создать тему"
            handleOnClick={() => {
              console.log('CLick');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumEmpty;
