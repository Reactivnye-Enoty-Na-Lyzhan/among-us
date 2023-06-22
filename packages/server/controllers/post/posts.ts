import type { Request, Response } from 'express';
import { Post } from '../../models/forum/post';
import { NotExistError } from '../../utils/errors/commonErrors/NotExistError';
import type {
  IRequestPostPost,
  IRequestGetPostById,
  IRequestDeletePost,
  IRequestPutPost,
} from '../../types/forum/types';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { User } from '../../models/user';
import { Message } from '../../models/forum/message';
import { Sequelize } from 'sequelize-typescript';
import { withErrorHandler } from '../../utils/errors/errorHandler';
import { NotAuthorizedError } from '../../utils/errors/commonErrors/NotAuthorizedError';

export const postPost = withErrorHandler(
  async (req: IRequestPostPost, res: Response) => {
    const { text, title } = req.body;
    const authorId = req.user?.id;
    const data = await Post.create({ text, title, authorId });
    res.send(data.dataValues);
  }
);

export const putPost = withErrorHandler(
  async (req: IRequestPutPost, res: Response) => {
    const { id, text, title, pinned } = req.body;
    const authorId = req.user?.id;
    const data = await Post.update(
      { text, title, authorId, pinned },
      { where: { id: id } }
    );
    res.send(data);
  }
);

export const getPosts = withErrorHandler(
  async (_req: Request, res: Response) => {
    const data = await Post.findAll({
      attributes: [
        [
          Sequelize.literal(
            `(SELECT COUNT (*)::int  FROM messages WHERE "postId" = "Post"."id")`
          ),
          'messagesCount',
        ],
        'id',
        'title',
        'text',
        'date',
        'pinned',
      ],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['login', 'avatar', 'firstName', 'lastName'],
        },
        {
          model: Message,
          as: 'messages',
          attributes: [],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.send(data);
  }
);

export const getPostById = withErrorHandler(
  async (req: IRequestGetPostById, res: Response) => {
    const { postId } = req.params;
    const parsedPostId = Number(postId);
    const data = await Post.findOne({
      where: { id: parsedPostId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['login', 'avatar', 'firstName', 'lastName'],
        },
      ],
    });
    if (!data) {
      throw new NotExistError(ErrorMessages.notFound);
    }
    res.send(data);
  }
);

export const deletePost = withErrorHandler(
  async (req: IRequestDeletePost, res: Response) => {
    const authorId = req.user?.id;

    if (!authorId) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const { postId } = req.params;
    const parsedPostId = Number(postId);
    const post = await Post.findOne({
      where: {
        id: parsedPostId,
      },
    });

    if (!post) throw new NotExistError(ErrorMessages.invalidPostId);

    if (post.authorId !== authorId)
      throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    await post.destroy();

    res.json({ postId: parsedPostId });
  }
);
