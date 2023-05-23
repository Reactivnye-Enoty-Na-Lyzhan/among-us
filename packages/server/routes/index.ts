import { Request, Response, Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';
import userRouter from './users';
import checkAuthHandler from '../middlewares/checkAuthHandler';
import forumRouter from './forum';

const router = Router();

// Регистрация и авторизация
router.use('/api/', authRouter);

// Проверка авторизации
router.use(checkAuthHandler);

router.use('/api/game', gameRouter);

router.use('/api/user', userRouter);

// Форум
router.use('/api/forum', forumRouter);

// Страница не найдена
router.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).send({
    message: 'Упс. 404',
  });
});

export { router as routes };
