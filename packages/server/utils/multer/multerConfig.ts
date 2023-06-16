import multer from 'multer';
import { MAX_UPLOAD_IMAGE_SIZE } from '../../utils/constants';

// Можно переделать каждый метод под middleware, чтобы обрабатывать ошибки корректно
export const upload = multer({
  limits: {
    fileSize: MAX_UPLOAD_IMAGE_SIZE,
  },
});
