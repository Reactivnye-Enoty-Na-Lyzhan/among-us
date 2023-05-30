import { FC, memo } from 'react';
import './Chat.css';

const Chat: FC = () => {
  return (
    <div className="meeting-chat">
      <h2 className="meeting-chat__title">Чат</h2>
    </div>
  );
};

export default memo(Chat);
