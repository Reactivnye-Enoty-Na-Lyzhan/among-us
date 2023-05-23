import type { NextFunction, Request, Response } from 'express';
import { Post } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type {
  IRequestPostPost,
  IRequestGetPostById,
  IRequestDeletePost,
} from '../../types/forum/types';
import { ErrorMessages } from '../../utils/errors/errorMessages';

export const postPost = async (
  req: IRequestPostPost,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Post.create({ ...req.body });
    res.send(data.dataValues);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Post.findAll();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (
  req: IRequestGetPostById,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const parsedPostId = Number(postId);
    const data = await Post.findOne({ where: { id: parsedPostId } });
    if (!data) {
      throw new NotExistError(ErrorMessages.notFound);
    }
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: IRequestDeletePost,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const parsedPostId = Number(postId);
    const data = await Post.destroy({ where: { id: parsedPostId } });
    if (!data) {
      throw new NotExistError(ErrorMessages.notFound);
    }
    res.end();
  } catch (err) {
    next(err);
  }
};
