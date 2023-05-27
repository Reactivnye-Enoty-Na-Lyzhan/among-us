import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import './Message.css';

type Props = {
  data: ForumMessageType;
};

const ForumMessage: FC<Props> = ({ data }) => {
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
        <span className="forum-post-message__author">
          {data.author.username}
        </span>
        <span className="forum-post-message__date">
          {new Date(data.date).toLocaleString()}
        </span>
      </div>
      <div className="forum-post-message__text">{data.text}</div>
    </div>
  );
};

export default ForumMessage;
