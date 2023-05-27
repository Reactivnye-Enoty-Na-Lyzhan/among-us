import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import ForumMessage from './Message/Message';
import './Messages.css';
import { User } from '@/store/auth/auth.types';

type Props = {
  messages: ForumMessageType[];
  user: User | undefined;
  postId: number;
};

const ForumMessages: FC<Props> = ({ user, messages, postId }) => {
  return (
    <div className="forum-post__messages">
      {messages.map(m => (
        <ForumMessage key={m.id} data={m} user={user} postId={postId} />
      ))}
    </div>
  );
};

export default ForumMessages;
