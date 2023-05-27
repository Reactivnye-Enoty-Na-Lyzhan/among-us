import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import './Message.css';
import { User } from '@/store/auth/auth.types';
import classNames from 'classnames';
import {
  useDeleteMessageMutation,
  useGetMessagesDataQuery,
} from '@/store/forum/forum.api';

type Props = {
  postId: number;
  data: ForumMessageType;
  user: User | undefined;
};

const ForumMessage: FC<Props> = ({ postId, data, user }) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const { refetch } = useGetMessagesDataQuery({ postId });

  const onDeleteButtonClick = async () => {
    await deleteMessage({ id: data.id });
    refetch();
  };

  return (
    <div className="forum-post-message">
      <div className="forum-post-message__header">
        <div
          className="forum-post-message__avatar"
          style={
            data.author.avatar
              ? {
                  backgroundImage: `url(${data.author.avatar})`,
                }
              : undefined
          }></div>
        <span
          className={classNames('forum-post-message__author', {
            'forum-post-message__author_myself': data.authorId === user?.id,
          })}>
          {data.author.username}
        </span>
        <span className="forum-post-message__date">
          {new Date(data.date).toLocaleString()}
        </span>
        <button
          type="button"
          className="forum-post-message__delete"
          title="Удалить"
          onClick={onDeleteButtonClick}
        />
      </div>
      <div className="forum-post-message__text">{data.text}</div>
    </div>
  );
};

export default ForumMessage;
