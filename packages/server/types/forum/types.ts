import type { Request } from 'express';
export interface IRequestPostMessage extends Request {
  body: {
    text: string;
    authorId: number;
    date: Date;
    userId: number;
  };
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
    userId: number;
  };
}
export interface IRequestPostPost extends Request {
  body: {
    text: string;
    authorId: number;
    date?: Date;
    pinned?: boolean;
    userId: number;
  };
}

export interface IRequestGetPostById extends Request {
  params: { postId: string };
}
export interface IRequestDeletePost extends Request {
  params: { postId: string };
}
