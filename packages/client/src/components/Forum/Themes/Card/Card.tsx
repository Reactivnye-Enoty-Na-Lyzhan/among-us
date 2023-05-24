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
            undefined
            // theme.avatarUrl
            //   ? { backgroundImage: `url('${theme.avatarUrl}')` }
            //   : undefined
          }></div>
        <div className="theme-card-info__container">
          <div className="theme-card-info__title">{theme.text}</div>
          <div className="theme-card-info__author">
            Автор:
            <span>{theme.authorId}</span>
          </div>
        </div>
      </div>
      <div className="theme-card__messages">
        Сообщений: <span>{0}</span>
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
      {/* {theme.lastMessage ? (
        <div className="theme-card-last-message theme-card__last-message">
          <div className="theme-card-last-message__container">
            <div className="theme-card-last-message__date">
              {theme.lastMessage.date}
            </div>
            <div className="theme-card-last-message__author">
              {theme.lastMessage.author}
            </div>
          </div>
          <div
            className="theme-card-last-message__avatar"
            style={
              theme.lastMessage.avatarUrl
                ? {
                    backgroundImage: `url(${theme.lastMessage.avatarUrl})`,
                  }
                : undefined
            }></div>
        </div>
      ) : null} */}
    </div>
  );
};

export default ThemeCard;
