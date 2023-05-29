import { Request, Response, Router } from 'express';
import checkAuthHandler from '../middlewares/checkAuthHandler';
import authRouter from './auth';
import forumRouter from './forum';
import gameRouter from './game';
import userRouter from './users';
import themeRouter from './themes';
import checkAuthHandler from '../middlewares/checkAuthHandler';
import forumRouter from './forum';
import leaderBoard from './leaderboard';

const router = Router();

// Регистрация и авторизация
router.use('/api/', authRouter);

// Проверка авторизации
router.use(checkAuthHandler);

router.use('/api/game', gameRouter);

router.use('/api/user', userRouter);

router.use('/api/theme', themeRouter);

// Форум
router.use('/api/forum', forumRouter);

router.use('/api/leaderboard', leaderBoard);

// Страница не найдена
router.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).send({
    message: 'Упс. 404',
  });
});

export { router as routes };
