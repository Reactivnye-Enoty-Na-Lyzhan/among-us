import { Router } from 'express';
import { logoutUser } from '../controllers/users';

const router = Router();

// Выход пользователя из системы
router.post('/logout', logoutUser);

export default router;
