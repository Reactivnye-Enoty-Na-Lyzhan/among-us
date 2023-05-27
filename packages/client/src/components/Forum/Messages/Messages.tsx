import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import ForumMessage from './Message/Message';
import './Messages.css';

type Props = {
  messages: ForumMessageType[];
};

const ForumMessages: FC<Props> = ({ messages }) => {
  return (
    <div className="forum-post__messages">
      {messages.map(m => (
        <ForumMessage key={m.id} data={m} />
      ))}
    </div>
  );
};

export default ForumMessages;
