import React, { FC } from 'react';
import './Card.css';

type Props = {
  topic: any;
};

const ThemeCard: FC<Props> = ({ topic }) => {
  return (
    <div className="topic-card">
      <div className="topic-card-info topic-card__info">
        <div className="topic-card-info__avatar"></div>
        <div className="topic-card-info__container">
          <div className="topic-card-info__title">{topic.title}</div>
          <div className="topic-card-info__author">
            Автор:
            <span>ezhikvtumane</span>
          </div>
        </div>
      </div>
      <div className="topic-card__messages">
        Сообщений: <span>1к</span>
      </div>
      <div className="topic-card-last-message topic-card__last-message">
        <div className="topic-card-last-message__container">
          <div className="topic-card-last-message__date">Сегодня в 17:35</div>
          <div className="topic-card-last-message__author">loshadkaaa</div>
        </div>
        <div className="topic-card-last-message__avatar"></div>
      </div>
    </div>
  );
};

export default ThemeCard;
