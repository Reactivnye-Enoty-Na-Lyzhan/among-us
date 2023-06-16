import {
  type ChangeEvent,
  type FC,
  type FormEventHandler,
  memo,
  useContext,
  useState,
} from 'react';
import {
  selectChatId,
  selectGame,
  selectPlayer,
} from '@/store/game/game.slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import './Controls.css';

type IHandleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => void;

const Controls: FC = () => {
  const [message, setMessage] = useState<string>('');

  const { id: playerId } = useTypedSelector(selectPlayer);
  const gameId = useTypedSelector(selectGame);
  const chatId = useTypedSelector(selectChatId);
  const socket = useContext(GameSocketContext);

  const handleTextareaChange: IHandleTextareaChange = evt => {
    const { value } = evt.target;
    setMessage(value);
  };

  const handleFormSubmit: FormEventHandler = evt => {
    evt.preventDefault();

    if (message.trim().length < 3) return;

    if (chatId && playerId && gameId) {
      socket.emit('sendMessage', { chatId, playerId, gameId, message });
      setMessage('');
    }
  };

  return (
    <form className="chat-control" noValidate onSubmit={handleFormSubmit}>
      <label htmlFor="message-area" className="chat-control__title">
        Отправить сообщение
      </label>
      <div className="chat-control__control">
        <textarea
          id="message-area"
          name="message"
          className="chat-control__message-area"
          onChange={handleTextareaChange}
          value={message}
          placeholder="Введите сообщение"
          maxLength={150}
        />
        <button
          className="chat-control__send-message"
          disabled={message.trim().length < 3}
        />
      </div>
    </form>
  );
};

export default memo(Controls);
