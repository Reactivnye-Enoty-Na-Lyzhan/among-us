import classNames from 'classnames';
import React, { FC } from 'react';
import './Card.css';
import { ForumPostType } from '@/store/forum/forum.types';

type Props = {
  theme: ForumPostType;
  hasEditAccess?: boolean;
  isPinned?: boolean;
};

const ThemeCard: FC<Props> = ({ theme, hasEditAccess, isPinned }) => {
  return (
    <div className="theme-card">
      <div className="theme-card-info theme-card__info">
        <div
          className="theme-card-info__avatar"
          style={
            theme.author.avatar
              ? { backgroundImage: `url('${theme.author.avatar}')` }
              : undefined
          }></div>
        <div className="theme-card-info__container">
          <div className="theme-card-info__title">{theme.title}</div>
          <div className="theme-card-info__author">
            Автор:
            <span>{theme.author.username}</span>
          </div>
        </div>
      </div>
      <div className="theme-card__messages">
        Сообщений: <span>{theme.messagesCount}</span>
      </div>
      {hasEditAccess ? (
        <div className="theme-card__tools">
          <button
            type="button"
            className="theme-card-tool theme-card-tool_type_delete"
            title="Удалить"
          />
          <button
            type="button"
            className={classNames('theme-card-tool', {
              'theme-card-tool_type_unpin': isPinned,
              'theme-card-tool_type_pin': !isPinned,
            })}
            title="Закрепить"
          />
        </div>
      ) : null}
      {theme.lastMessage && theme.lastMessage.length ? (
        <div className="theme-card-last-message theme-card__last-message">
          <div className="theme-card-last-message__container">
            <div className="theme-card-last-message__date">
              {new Date(theme.lastMessage[0].date).toLocaleString()}
            </div>
            <div className="theme-card-last-message__author">
              {theme.lastMessage[0].author.username}
            </div>
          </div>
          <div
            className="theme-card-last-message__avatar"
            style={
              theme.lastMessage[0].author.avatar
                ? {
                    backgroundImage: `url(${theme.lastMessage[0].author.avatar})`,
                  }
                : undefined
            }></div>
        </div>
      ) : null}
    </div>
  );
};

export default ThemeCard;
