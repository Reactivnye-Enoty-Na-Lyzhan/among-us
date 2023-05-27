import { useCreateMessageMutation } from '@/store/forum/forum.api';
import React, { FC, useState } from 'react';
import './NewMessage.css';
import { ForumMessageType } from '@/store/forum/forum.types';

type Props = {
  postId: number;
  refetchMessages: () => void;
  messageParent: ForumMessageType | undefined;
  setMessageParent: (message: ForumMessageType | undefined) => void;
};

const ForumPostNewMessage: FC<Props> = ({
  postId,
  messageParent,
  setMessageParent,
  refetchMessages,
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [createMessage] = useCreateMessageMutation();

  const onNewMessageButtonClick = async () => {
    if (value) {
      setValue('');
      await createMessage({ postId, text: value, parentId: messageParent?.id });
      refetchMessages();
      setMessageParent(undefined);
    }
  };

  return (
    <div className="forum-post-new-message">
      <div className="forum-post-new-message__container">
        {messageParent ? (
          <div className="forum-post-new-message__answer">
            Ответ на комментарий{' '}
            <a href={`#${messageParent.id}`}>
              {messageParent?.author.username}
            </a>{' '}
            <button
              onClick={() => {
                setMessageParent(undefined);
              }}>
              x
            </button>
          </div>
        ) : null}
        <textarea
          className="forum-post-new-message__textarea"
          value={value}
          maxLength={2000}
          onChange={e => {
            setValue(e.target.value);
          }}></textarea>
        <button
          type="button"
          className="forum-post-new-message__button"
          onClick={onNewMessageButtonClick}
          disabled={!value}>
          Отправить комментарий
        </button>
      </div>
    </div>
  );
};

export default ForumPostNewMessage;
