import type { Request } from 'express';
import type { Message } from '../models/forum/message';
import type { Post } from '../models/forum/post';

export interface RequestPostMessage extends Request {
  body: Message;
}

export interface RequestGetAllMessageByIdPost extends Request {
  query: { postId: string };
}
export interface RequestPostPost extends Request {
  body: Post;
}

export interface RequestGetPostById extends Request {
  params: { postId: string };
}

export interface RequestGetTheme extends Request {
  params: { id: string };
}

export interface RequestGetMode extends Request {
  params: { id: string };
}
