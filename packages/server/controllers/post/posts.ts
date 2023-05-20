import type { Request, Response } from 'express';
import { PostModel } from '../../models/forum/post';
import type { RequestPostPost, RequestGetPostById } from '../../utils/type';

export const postPost = async (req: RequestPostPost, res: Response) => {
  const data = await PostModel.create({ ...req.body });
  res.status(201).send(data.dataValues);
};

export const getPosts = async (_req: Request, res: Response) => {
  const data = await PostModel.findAll();
  res.status(200).send(data);
};

export const getPostById = async (req: RequestGetPostById, res: Response) => {
  const { postId } = req.params;
  const data = await PostModel.findOne({ where: { id: Number(postId) } });
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).json({ message: 'Упс. Ничего не найдено.' });
  }
};
