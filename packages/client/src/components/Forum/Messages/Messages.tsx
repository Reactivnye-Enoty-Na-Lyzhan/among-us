import { ForumMessageType } from '@/store/forum/forum.types';
import React, { FC } from 'react';
import ForumMessage from './Message/Message';
import './Messages.css';
import { User } from '@/store/auth/auth.types';

type Props = {
  messages: ForumMessageType[];
  user: User | undefined;
  postId: number;
  messageParent: ForumMessageType | undefined;
  setMessageParent: (message: ForumMessageType | undefined) => void;
};

const ForumMessages: FC<Props> = ({
  user,
  messages,
  postId,
  messageParent,
  setMessageParent,
}) => {
  return (
    <div className="forum-post__messages">
      {messages.map(m => (
        <ForumMessage
          key={m.id}
          data={m}
          user={user}
          postId={postId}
          messageParent={messageParent}
          setMessageParent={setMessageParent}
        />
      ))}
    </div>
  );
};

export default ForumMessages;
