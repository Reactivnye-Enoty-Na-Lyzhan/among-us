import { Request, Response, Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';
import userRouter from './users';
import checkAuthHandler from '../middlewares/checkAuthHandler';
import { messageRouter } from './message';
import { postRouter } from './post';

const router = Router();

// Регистрация и авторизация
router.use('/api/', authRouter);

// Проверка авторизации
router.use(checkAuthHandler);

router.use('/api/game', gameRouter);

router.use('/api/user', userRouter);

router.use('/api/messages', messageRouter);

router.use('/api/posts', postRouter);

// Страница не найдена
router.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).send({
    message: 'Упс. 404',
  });
});

export { router as routes };
