import {
  type ChangeEvent,
  type FC,
  type FormEventHandler,
  memo,
  useContext,
  useState,
  KeyboardEventHandler,
} from 'react';
import {
  selectChatId,
  selectGame,
  selectPlayer,
} from '@/store/game/game.slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import './Controls.css';
import classNames from 'classnames';

type IHandleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => void;

const Controls: FC = () => {
  const [message, setMessage] = useState<string>('');

  const { id: playerId, alive: currentPlayerIsAlive } =
    useTypedSelector(selectPlayer);
  const gameId = useTypedSelector(selectGame);
  const chatId = useTypedSelector(selectChatId);
  const socket = useContext(GameSocketContext);

  const chatControlClassname = classNames('chat-control', {
    'chat-control_disabled': !currentPlayerIsAlive,
  });

  const handleTextareaChange: IHandleTextareaChange = evt => {
    const { value } = evt.target;
    setMessage(value);
  };

  const handleChatControlKeydown: KeyboardEventHandler<
    HTMLTextAreaElement
  > = evt => {
    const { key, shiftKey } = evt;
    if (key === 'Enter' && shiftKey) {
      evt.preventDefault();
      handleSendMessage();
    }
  };

  const handleFormSubmit: FormEventHandler = evt => {
    evt.preventDefault();
    handleSendMessage();
  };

  const handleSendMessage = () => {
    if (message.trim().length < 3) return;

    if (chatId && playerId && gameId) {
      socket.emit('sendMessage', { chatId, playerId, gameId, message });
      setMessage('');
    }
  };

  return (
    <form
      className={chatControlClassname}
      noValidate
      onSubmit={handleFormSubmit}>
      <label htmlFor="message-area" className="chat-control__title">
        Отправить сообщение
      </label>
      <div className="chat-control__control">
        <textarea
          id="message-area"
          name="message"
          className="chat-control__message-area"
          onChange={handleTextareaChange}
          onKeyDown={handleChatControlKeydown}
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
