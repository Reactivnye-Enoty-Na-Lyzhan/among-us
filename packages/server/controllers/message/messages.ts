import type { NextFunction, Response } from 'express';
import type {
  IRequestGetAllMessageByIdPost,
  IRequestPostMessage,
  IRequestDeleteMessage,
  IRequestReplyToMessage,
} from '../../types/forum/types';
import { Message } from '../../models/forum/message';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { User } from '../../models/user';

export const postMessage = async (
  req: IRequestPostMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, postId } = req.body;
    const authorId = req.user?.id;
    const data = await Message.create({ text, authorId, postId });
    res.send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (
  req: IRequestGetAllMessageByIdPost,
  res: Response,
  next: NextFunction
) => {
  try {
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
          attributes: ['username', 'avatar', 'firstName', 'lastName'],
        },
      ],
    });
    if (data.length > 0) {
      res.send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (
  req: IRequestDeleteMessage,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const replyToMessage = async (
  req: IRequestReplyToMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, text, parentId } = req.body;
    const authorId = req.user?.id;
    const data = await Message.create({
      postId,
      text,
      parentId,
      authorId,
    });
    res.send(data.dataValues);
  } catch (err) {
    next(err);
  }
};
