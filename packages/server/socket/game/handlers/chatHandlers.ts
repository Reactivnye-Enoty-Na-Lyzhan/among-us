import { ChatMessage } from '../../../models/chat/chatMessage';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  GameSocket,
  GameSocketNamespace,
  GetMessages,
  MessageType,
  SendMessage,
} from '../../../types/socket/game/gameSocket.types';

export const chatHalders = (socket: GameSocket, io: GameSocketNamespace) => {
  const sendMessage: SendMessage = async ({
    chatId,
    gameId,
    playerId,
    message,
  }) => {
    try {
      if (!chatId) throw new NotExistError(ErrorMessages.chatNotFound);

      const newMessage = await ChatMessage.create({
        text: message,
        authorId: playerId,
        chatId,
      });

      io.to(gameId.toString()).emit('onGetMessage', newMessage);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const getMessages: GetMessages = async (chatId, callback) => {
    try {
      const messages: MessageType[] = await ChatMessage.findAll({
        where: {
          chatId,
        },
        attributes: ['id', 'text', 'authorId'],
      });

      if (!messages) throw new NotExistError(ErrorMessages.chatNotFound);

      callback(messages);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('getMessages', getMessages);
  socket.on('sendMessage', sendMessage);
};
