import { FC, memo } from 'react';
import Messages from './Messages/Messages';
import Controls from './Controls/Controls';
import './Chat.css';

const Chat: FC = () => {
  return (
    <div className="meeting-chat">
      <h2 className="meeting-chat__title">Чат</h2>
      <Messages />
      <Controls />
    </div>
  );
};

export default memo(Chat);
