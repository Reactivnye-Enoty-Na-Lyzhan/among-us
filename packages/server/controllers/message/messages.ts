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

export const postMessage = async (
  req: IRequestPostMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const data = await Message.create({
      text: body.text,
      authorId: body.authorId,
      date: body.date,
    });
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
    const { postId } = req.query;
    const parsedPostId = Number(postId);
    if (isNaN(parsedPostId)) {
      throw new Error(ErrorMessages.invalidPostId);
    }
    const data = await Message.findAll({
      where: { postId: parsedPostId },
      raw: true,
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
    res.send();
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
    const { postId, text, parentId, date, authorId } = req.body;
    const data = await Message.create({
      postId,
      text,
      parentId,
      date,
      authorId,
    });
    res.send(data.dataValues);
  } catch (err) {
    next(err);
  }
};
