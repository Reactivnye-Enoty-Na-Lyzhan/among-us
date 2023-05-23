import { Router } from 'express';
import { router as postRouter } from './post/posts';
import { router as messageRouter } from './message/messages';

const combinedRouter = Router();

combinedRouter.use('/posts', postRouter);
combinedRouter.use('/messages', messageRouter);

export { combinedRouter as forumRouter };
