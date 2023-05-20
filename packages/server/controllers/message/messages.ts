import type { NextFunction, Response } from 'express';
import type { RequestGetAllMessageByIdPost, RequestPostMessage } from '../../utils/type';
import { MessageModel } from '../../models/forum/message';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../utils/errors/errorMessages';

export const postMessage = async (req: RequestPostMessage, res: Response, next: NextFunction) => {
  try {
    const data = await MessageModel.create({ ...req.body });
    res.status(201).send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: RequestGetAllMessageByIdPost, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.query;
    const data = await MessageModel.findAll({ where: { postId: Number(postId) }, raw: true });
    if (data && data.length) {
      res.status(200).send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};
