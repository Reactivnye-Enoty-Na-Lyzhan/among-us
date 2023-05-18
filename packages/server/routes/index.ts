import { Router } from 'express';
import commonRouter from './commons';

const router = Router();

// Пример подключения группы маршрутов
router.use('/', commonRouter);

export { router as routes };
