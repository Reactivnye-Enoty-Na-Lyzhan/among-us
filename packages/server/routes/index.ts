import { Request, Response, Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';
import userRouter from './users';
import themeRouter from './themes';
import checkAuthHandler from '../middlewares/checkAuthHandler';
import { messageRouter, postRouter } from './forum';

const router = Router();

// Регистрация и авторизация
router.use('/api/', authRouter);

// Проверка авторизации
router.use(checkAuthHandler);

router.use('/api/game', gameRouter);

router.use('/api/user', userRouter);

router.use('/api/theme', themeRouter);

// Сообщения форума
router.use('/api/forum/messages', messageRouter);
router.use('/api/forum/posts', postRouter);

// Страница не найдена
router.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).send({
    message: 'Упс. 404',
  });
});

export { router as routes };
