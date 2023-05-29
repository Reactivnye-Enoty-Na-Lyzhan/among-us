import { Router } from 'express';
import { router as postRouter } from './post/posts';
import { router as messageRouter } from './message/messages';
import { router as reactionsOnMessageRouter } from './reactions-on-message/router';

const forumRouter = Router();

forumRouter.use('/posts', postRouter);
forumRouter.use('/messages', messageRouter);
forumRouter.use('/message-reactions', reactionsOnMessageRouter);

export default forumRouter;
