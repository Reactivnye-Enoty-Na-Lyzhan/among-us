import type { Request } from 'express';
import type { Message } from '../../models/forum/message';
import type { Post } from '../../models/forum/post';

export interface IRequestPostMessage extends Request {
  body: Message;
}

export interface IRequestGetAllMessageByIdPost extends Request {
  query: { postId: string };
}

export interface IRequestDeleteMessage extends Request {
  params: { messageId: string };
}

export interface IRequestReplyToMessage extends Request {
  body: {
    postId: number;
    text: string;
    parentId?: number;
    date: Date;
    authorId: number;
  };
}
export interface IRequestPostPost extends Request {
  body: Post;
}

export interface IRequestGetPostById extends Request {
  params: { postId: string };
}

export interface IRequestGetTheme extends Request {
  params: { id: string };
}

export interface IRequestGetMode extends Request {
  params: { id: string };
}

export interface IRequestDeletePost extends Request {
  params: { postId: string };
}
