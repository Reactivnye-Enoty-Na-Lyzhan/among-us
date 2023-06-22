import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import './Message.css';
import { User } from '@/store/auth/auth.types';
import classNames from 'classnames';
import {
  useDeleteMessageMutation,
  useGetMessagesDataQuery,
} from '@/store/forum/forum.api';
import { DEFAULT_RESOURCE_URL } from '@/utils/constants';

type Props = {
  postId: number;
  data: ForumMessageType;
  user: User | undefined;
  messageParent: ForumMessageType | undefined;
  setMessageParent: (message: ForumMessageType | undefined) => void;
};

const ForumMessage: FC<Props> = ({ postId, data, user, setMessageParent }) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const { refetch } = useGetMessagesDataQuery({ postId });

  const onDeleteButtonClick = async () => {
    await deleteMessage({ id: data.id });
    refetch();
  };

  return (
    <div className="forum-post-message" id={`${data.id}`}>
      <div className="forum-post-message__header">
        <div
          className="forum-post-message__avatar"
          style={
            data.author.avatar
              ? {
                  backgroundImage: `url(${DEFAULT_RESOURCE_URL}/${data.author.avatar})`,
                }
              : undefined
          }></div>
        <span
          className={classNames('forum-post-message__author', {
            'forum-post-message__author_myself': data.authorId === user?.id,
          })}>
          {data.author.login}
        </span>
        <span className="forum-post-message__date">
          {new Date(data.date).toLocaleString()}
        </span>
        {data.parentId ? (
          <span className="forum-post-message__parent">
            в ответ на
            <a href={`#${data.parentId}`}>комментарий</a>
          </span>
        ) : null}

        <button
          type="button"
          className="forum-post-message__delete"
          title="Удалить"
          onClick={onDeleteButtonClick}
          hidden={data.authorId !== user?.id}
        />
      </div>
      <div className="forum-post-message__text">{data.text}</div>
      <div className="forum-post-message__answer">
        <button
          onClick={() => {
            setMessageParent(data);
          }}>
          ответить
        </button>
      </div>
    </div>
  );
};

export default ForumMessage;
