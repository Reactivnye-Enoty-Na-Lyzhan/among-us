import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users';
import {
  createUserValidation,
  loginUserValidation,
} from '../utils/validation/requestValidation';
import { limitAuth } from '../utils/securityData/rateLimitSettings';

const router = Router();

// Авторизация
router.post('/signin', limitAuth, loginUserValidation, loginUser);

// Регистрация
router.post('/signup', limitAuth, createUserValidation, createUser);

export default router;
