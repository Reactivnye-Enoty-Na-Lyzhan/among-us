import React, { FC } from 'react';
import ForumButton from '../../Button/Button';
import './Empty.css';
import { useNavigate } from 'react-router-dom';

const ForumEmpty: FC = () => {
  const navigate = useNavigate();

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
              navigate('/forum/create');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumEmpty;
