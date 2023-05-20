import { Router } from 'express';
import { changePassword, getCurrentUser, logoutUser, updateProfile } from '../controllers/users';
import { 
  changePasswordValidation, updateProfileValidation,
 } from '../utils/validation/requestValidation';

const router = Router();

// Получить данные текущего пользователя
router.get('/', getCurrentUser);

// Обновить профиль
router.patch('/profile', updateProfileValidation, updateProfile);

// Изменить пароль
router.patch('/password', changePasswordValidation, changePassword);

// Выход пользователя из системы
router.post('/logout', logoutUser);

export default router;
