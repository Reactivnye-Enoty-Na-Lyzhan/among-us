import type { Request } from 'express';

interface IUser {
  id: number;
}

export interface IRequestPostMessage extends Request {
  user?: IUser;
  body: {
    postId: number;
    text: string;
    date?: Date;
    parentId?: number;
  };
}

export interface IRequestGetAllMessageByIdPost extends Request {
  params: { postId: string };
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
    date?: Date;
  };
}
export interface IRequestPostPost extends Request {
  user?: IUser;
  body: {
    text: string;
    title: string;
    date?: Date;
    pinned?: boolean;
  };
}
export interface IRequestPutPost extends Request {
  user?: IUser;
  body: {
    id: number;
    text: string;
    title: string;
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
