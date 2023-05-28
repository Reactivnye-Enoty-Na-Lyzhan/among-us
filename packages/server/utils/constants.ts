import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: '../../../.env',
});

const { NODE_ENV } = process.env;

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE =
  'Что-то пошло не так на стороне сервера...';

export const NOT_FOUNT_CODE = 404;
export const NOT_FOUNT_MESSAGE =
  'Страница или документ не найден. Попробуйте ещё раз';

export const CLIENT_PACKAGE_PATH = path.resolve(
  __dirname,
  `${
    process.env.NODE_ENV === 'development' ? '../../client' : '../../../client'
  }`
);

export const MAX_PLAYERS = 9;

export const MIN_PLAYERS = 3;

export const CIVIL_VICTORY_SCORE = 1200;

export const CURRENT_HOST =
  NODE_ENV === 'production' ? 'localhost' : 'localhost';

export const MAX_UPLOAD_IMAGE_SIZE = 0.5 * Math.pow(1024, 2);
