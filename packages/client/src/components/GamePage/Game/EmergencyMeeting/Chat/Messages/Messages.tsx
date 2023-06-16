import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import Message from './Message/Message';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectPlayers } from '@/store/game/game.slice';
import type { IMessage } from '@/store/game/game.types';
import './Messages.css';

const Messages: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const players = useTypedSelector(selectPlayers);

  const chatId = useTypedSelector(state => state.game.chatId);

  const socket = useContext(GameSocketContext);

  useEffect(() => {
    // Подписываемся на получение новых сообщений
    socket.on('onGetMessage', handleGetMessage);

    if (chatId) {
      // Запрашиваем все сообщения
      socket.emit('getMessages', chatId, (messages: IMessage[]) => {
        setMessages(messages);
      });
    }

    return () => {
      socket.off('onGetMessage', handleGetMessage);
    };
  }, [socket]);

  // Получаем автора сообщения из игроков
  const getAuthor = (playerId: number) => {
    return players.find(player => player.id === playerId);
  };

  // Обработчик получения сообщения
  const handleGetMessage = useCallback((message: IMessage) => {
    setMessages(messagesList => [...messagesList, message]);
  }, []);

  return (
    <ul className="chat-messages">
      {messages.map(message => (
        <Message
          key={message.id}
          text={message.text}
          author={getAuthor(message.authorId) ?? players[0]}
        />
      ))}
    </ul>
  );
};

export default memo(Messages);
