import classNames from 'classnames';
import React, { FC } from 'react';
import './Card.css';

type Props = {
  theme: ForumTheme;
  isAdmin?: boolean;
  isPinned?: boolean;
};

const ThemeCard: FC<Props> = ({ theme, isAdmin, isPinned }) => {
  return (
    <div className="theme-card">
      <div className="theme-card-info theme-card__info">
        <div
          className="theme-card-info__avatar"
          style={{ backgroundImage: `url(${theme.avatarUrl})` }}></div>
        <div className="theme-card-info__container">
          <div className="theme-card-info__title">{theme.title}</div>
          <div className="theme-card-info__author">
            Автор:
            <span>{theme.author}</span>
          </div>
        </div>
      </div>
      <div className="theme-card__messages">
        Сообщений: <span>{theme.messagesCount}</span>
      </div>
      {isAdmin ? (
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
      {theme.lastMessage ? (
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
            style={{
              backgroundImage: `url(${theme.lastMessage.avatarUrl})`,
            }}></div>
        </div>
      ) : null}
    </div>
  );
};

export default ThemeCard;
