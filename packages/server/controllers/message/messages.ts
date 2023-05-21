import type { NextFunction, Response } from 'express';
import type { IRequestGetAllMessageByIdPost, IRequestPostMessage, IRequestDeleteMessage, IRequestReplyToMessage } from '../../utils/type';
import { Message } from '../../models/forum/message';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../utils/errors/errorMessages';

export const postMessage = async (req: IRequestPostMessage, res: Response, next: NextFunction) => {
  try {
    const data = await Message.create({ ...req.body });
    res.status(201).send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: IRequestGetAllMessageByIdPost, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.query;
    const data = await Message.findAll({ where: { postId: Number(postId) }, raw: true });
    if (data && data.length) {
      res.status(200).send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req: IRequestDeleteMessage, res: Response, next: NextFunction) => {
  try {
    const { messageId } = req.params;
    const deleteMessage = await Message.destroy({ where: { id: messageId } });
    if (deleteMessage === 0) {
      throw new NotExistError(ErrorMessages.notFound);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


export const replyToMessage = async (req: IRequestReplyToMessage, res: Response, next: NextFunction) => {
  try {
    const data = await Message.create({ ...req.body});
    res.status(201).send(data.dataValues);
  } catch (err) {
    next(err);
  }
};
