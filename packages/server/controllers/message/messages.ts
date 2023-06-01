import type { Response } from 'express';
import type {
  IRequestGetAllMessageByIdPost,
  IRequestPostMessage,
  IRequestDeleteMessage,
  IRequestReplyToMessage,
} from '../../types/forum/types';
import { Message } from '../../models/forum/message';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { withErrorHandler } from '../../utils/errors/errorHandler';
import { User } from '../../models/user';

export const postMessage = withErrorHandler(
  async (req: IRequestPostMessage, res: Response) => {
    const { text, postId, parentId } = req.body;
    const authorId = req.user?.id;
    const data = await Message.create({ text, authorId, postId, parentId });
    res.send(data.dataValues);
  }
);

export const getMessages = withErrorHandler(
  async (req: IRequestGetAllMessageByIdPost, res: Response) => {
    const { postId } = req.params;
    const parsedPostId = Number(postId);
    if (isNaN(parsedPostId)) {
      throw new Error(ErrorMessages.invalidPostId);
    }
    const data = await Message.findAll({
      where: { postId: parsedPostId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['login', 'avatar', 'firstName', 'lastName'],
        },
      ],
    });
    if (data.length > 0) {
      res.send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  }
);

export const deleteMessage = withErrorHandler(
  async (req: IRequestDeleteMessage, res: Response) => {
    const { messageId } = req.params;
    const parsedMessageId = Number(messageId);
    if (isNaN(parsedMessageId)) {
      throw new Error(ErrorMessages.invalidMessageId);
    }
    const deleteMessage = await Message.destroy({
      where: { id: parsedMessageId },
    });
    if (deleteMessage === 0) {
      throw new NotExistError(ErrorMessages.notFound);
    }
    res.send({ messageId: parsedMessageId });
  }
);

export const replyToMessage = withErrorHandler(
  async (req: IRequestReplyToMessage, res: Response) => {
    const { postId, text, parentId } = req.body;
    const authorId = req.user?.id;
    const data = await Message.create({ postId, text, parentId, authorId });
    res.send(data.dataValues);
  }
);
