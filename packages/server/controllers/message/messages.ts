import type { Response } from 'express';
import type { RequestGetAllMessageByIdPost, RequestPostMessage } from '../../utils/type';
import { MessageModel } from '../../models/forum/message';

export const postMessage = async (req: RequestPostMessage, res: Response) => {
  const data = await MessageModel.create({ ...req.body });
  res.status(201).send(data.dataValues);
};

export const getMessages = async (req: RequestGetAllMessageByIdPost, res: Response) => {
  const { postId } = req.query;
  const data = await MessageModel.findAll({ where: { postId: Number(postId) }, raw: true });
  if (data && data.length) {
    res.status(200).send(data);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
};
