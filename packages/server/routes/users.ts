import { Router } from 'express';
import {
  changePassword,
  getCurrentUser,
  logoutUser,
  updateProfile,
} from '../controllers/users';
import {
  changePasswordValidation,
  updateProfileValidation,
} from '../utils/validation/requestValidation';
import { uploadImage } from '../controllers/images';
import { upload } from '../utils/multer/multerConfig';

const router = Router();

// Получить данные текущего пользователя
router.get('/', getCurrentUser);

// Обновить профиль
router.patch('/profile', updateProfileValidation, updateProfile);

// Изменить пароль
router.patch('/password', changePasswordValidation, changePassword);

router.post('/avatar', upload.single('image'), uploadImage);

// Выход пользователя из системы
router.post('/logout', logoutUser);

export default router;
