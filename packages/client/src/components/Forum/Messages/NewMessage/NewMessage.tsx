import { useCreateMessageMutation } from '@/store/forum/forum.api';
import React, { FC, useState } from 'react';
import './NewMessage.css';

type Props = {
  postId: number;
  refetchMessages: () => void;
};

const ForumPostNewMessage: FC<Props> = ({ postId, refetchMessages }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [createMessage] = useCreateMessageMutation();

  const onNewMessageButtonClick = async () => {
    if (value) {
      setValue('');
      await createMessage({ postId, text: value });
      refetchMessages();
    }
  };

  return (
    <div className="forum-post-new-message">
      <div className="forum-post-new-message__container">
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
