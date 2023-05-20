import type { NextFunction, Request, Response } from 'express';
import { PostModel } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type { RequestPostPost, RequestGetPostById } from '../../utils/type';
import { ErrorMessages } from '../../utils/errors/errorMessages';

export const postPost = async (req: RequestPostPost, res: Response, next: NextFunction) => {
  try {
    const data = await PostModel.create({ ...req.body });
    res.status(201).send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await PostModel.findAll();
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req: RequestGetPostById, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const data = await PostModel.findOne({ where: { id: Number(postId) } });
    if (data) {
      res.status(200).send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};
