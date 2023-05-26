import type { NextFunction, Request, Response } from 'express';
import { Post } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type {
  IRequestPostPost,
  IRequestGetPostById,
  IRequestDeletePost,
} from '../../types/forum/types';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { User } from '../../models/user';
import { Message } from '../../models/forum/message';
import { Sequelize } from 'sequelize-typescript';

export const postPost = async (
  req: IRequestPostPost,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, title, date, pinned } = req.body;
    const authorId = req.user?.id;
    const data = await Post.create({ text, title, authorId, date, pinned });
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
    const data = await Post.findAll({
      attributes: [
        [
          Sequelize.literal(
            `(SELECT COUNT (*)::int  FROM messages WHERE "postId" = "Post"."id")`
          ),
          'messagesCount',
        ],
        'title',
        'text',
        'date',
        'pinned',
      ],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'avatar', 'firstName', 'lastName'],
        },
        {
          model: Message,
          as: 'messages',
          attributes: [],
        },
        {
          model: Message,
          as: 'lastMessage',
          limit: 1,
          attributes: ['text', 'date'],
          order: [['id', 'DESC']],
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['username', 'avatar', 'firstName', 'lastName'],
            },
          ],
        },
      ],
    });
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
    const data = await Post.findOne({
      where: { id: parsedPostId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'avatar', 'firstName', 'lastName'],
        },
      ],
    });
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
    res.json({ postId: parsedPostId });
  } catch (err) {
    next(err);
  }
};
