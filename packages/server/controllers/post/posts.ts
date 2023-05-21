import type { NextFunction, Request, Response } from 'express';
import { Post } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type { IRequestPostPost, IRequestGetPostById, IRequestDeletePost } from '../../utils/type';
import { ErrorMessages } from '../../utils/errors/errorMessages';

export const postPost = async (req: IRequestPostPost, res: Response, next: NextFunction) => {
  try {
    const data = await Post.create({ ...req.body });
    res.status(201).send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Post.findAll();
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req: IRequestGetPostById, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const data = await Post.findOne({ where: { id: Number(postId) } });
    if (data) {
      res.status(200).send(data);
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};


export const deletePost = async (req: IRequestDeletePost, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const data = await Post.destroy({ where: { id: Number(postId) } });
    if (data) {
      res.status(204).end();
    } else {
      throw new NotExistError(ErrorMessages.notFound);
    }
  } catch (err) {
    next(err);
  }
};
