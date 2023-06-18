import classNames from 'classnames';
import React, { FC } from 'react';
import './Card.css';
import { ForumPostType } from '@/store/forum/forum.types';
import { Link } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostsDataQuery,
  useUpdatePostMutation,
} from '@/store/forum/forum.api';
import { DEFAULT_RESOURCE_URL } from '@/utils/constants';

type Props = {
  theme: ForumPostType;
  hasEditAccess?: boolean;
  isPinned?: boolean;
};

const ThemeCard: FC<Props> = ({ theme, hasEditAccess, isPinned }) => {
  const { refetch } = useGetPostsDataQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const onDeleteButtonClick = async () => {
    // TBD: Temporary implementation
    if (confirm('Вы действительно хотите удалить тему?')) {
      await deletePost({ postId: theme.id });
      refetch();
    }
  };

  const onPinButtonClick = async () => {
    await updatePost({ ...theme, pinned: !theme.pinned });
    refetch();
  };

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
          <Link to={`/forum/${theme.id}`} className="theme-card-info__title">
            {theme.title}
          </Link>
          <div className="theme-card-info__author">
            Автор:
            <span>{theme.author.login}</span>
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
            onClick={onDeleteButtonClick}
          />
          <button
            type="button"
            className={classNames('theme-card-tool', {
              'theme-card-tool_type_unpin': isPinned,
              'theme-card-tool_type_pin': !isPinned,
            })}
            title="Закрепить"
            onClick={onPinButtonClick}
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
              {theme.lastMessage[0].author.login}
            </div>
          </div>
          <div
            className="theme-card-last-message__avatar"
            style={
              theme.lastMessage[0].author.avatar
                ? {
                    backgroundImage: `url(${DEFAULT_RESOURCE_URL}/${theme.lastMessage[0].author.avatar})`,
                  }
                : undefined
            }></div>
        </div>
      ) : null}
    </div>
  );
};

export default ThemeCard;
