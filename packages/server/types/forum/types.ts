import type { Request } from 'express';
import { IUser } from '../../controllers/games';
export interface IRequestPostMessage extends Request {
  user?: IUser;
  body: {
    text: string;
    date: Date;
  };
}

export interface IRequestGetAllMessageByIdPost extends Request {
  query: { postId: string };
}

export interface IRequestDeleteMessage extends Request {
  params: { messageId: string };
}

export interface IRequestReplyToMessage extends Request {
  user?: IUser;
  body: {
    postId: number;
    text: string;
    parentId?: number;
    date: Date;
  };
}
export interface IRequestPostPost extends Request {
  user?: IUser;
  body: {
    text: string;
    date?: Date;
    pinned?: boolean;
  };
}

export interface IRequestGetPostById extends Request {
  params: { postId: string };
}
export interface IRequestDeletePost extends Request {
  params: { postId: string };
}
