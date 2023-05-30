import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users';
import {
  createUserValidation,
  loginUserValidation,
} from '../utils/validation/requestValidation';
import { limitAuth } from '../utils/securityData/rateLimitSettings';
import { getOAuthToken, oAuthRedirect } from '../controllers/oAuth';

const router = Router();

// Авторизация
router.post('/signin', limitAuth, loginUserValidation, loginUser);

// Регистрация
router.post('/signup', limitAuth, createUserValidation, createUser);

// Получить код oAuth
router.get('/code', oAuthRedirect);

// Авторизация через oAuth
router.post('/token', getOAuthToken);

export default router;
