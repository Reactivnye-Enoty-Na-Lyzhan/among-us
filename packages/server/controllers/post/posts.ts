import type { Request, Response } from 'express';
import { Post } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type {
  IRequestPostPost,
  IRequestGetPostById,
  IRequestDeletePost,
} from '../../types/forum/types';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { withErrorHandler } from '../../utils/errors/errorHandler';

export const postPost = withErrorHandler(async (req: IRequestPostPost, res: Response) => {
  const { text, date, pinned } = req.body;
  const authorId = req.user?.id;
  const data = await Post.create({ text, authorId, date, pinned });
  res.send(data.dataValues);
});

export const getPosts = withErrorHandler(async (_req: Request, res: Response) => {
  const data = await Post.findAll();
  res.send(data);
});

export const getPostById = withErrorHandler(async (req: IRequestGetPostById, res: Response) => {
  const { postId } = req.params;
  const parsedPostId = Number(postId);
  const data = await Post.findOne({ where: { id: parsedPostId } });
  if (!data) {
    throw new NotExistError(ErrorMessages.notFound);
  }
  res.send(data);
});

export const deletePost = withErrorHandler(async (req: IRequestDeletePost, res: Response) => {
  const { postId } = req.params;
  const parsedPostId = Number(postId);
  const data = await Post.destroy({ where: { id: parsedPostId } });
  if (!data) {
    throw new NotExistError(ErrorMessages.notFound);
  }
  res.json({ postId: parsedPostId });
});
