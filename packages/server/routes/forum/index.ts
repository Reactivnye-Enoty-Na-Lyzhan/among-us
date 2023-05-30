import { Router } from 'express';
import { router as postRouter } from './post/posts';
import { router as messageRouter } from './message/messages';

const forumRouter = Router();

forumRouter.use('/posts', postRouter);
forumRouter.use('/messages', messageRouter);

export default forumRouter;
