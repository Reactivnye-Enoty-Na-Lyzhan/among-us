import { Router } from 'express';
import commonRouter from './commons';
import userRouter from './users';

const router = Router();

// Пример подключения группы маршрутов
router.use('/api', commonRouter);

router.use('/users', userRouter);

export { router as routes };
