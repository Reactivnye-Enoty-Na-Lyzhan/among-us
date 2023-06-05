import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: '../../../.env',
});

const { NODE_ENV, OAUTH_CLIENT } = process.env;

export const DEFAULT_SUCCESSFUL_RESPONSE = 'OK';

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

export const MAX_PLAYERS = 3;

export const MIN_PLAYERS = 1;

export const CIVIL_VICTORY_SCORE = 1200;

export const CURRENT_HOST =
  NODE_ENV === 'production' ? 'localhost' : 'localhost';

export const MAX_UPLOAD_IMAGE_SIZE = 0.5 * Math.pow(1024, 2);

const OAUTH_BASE_URL = 'https://oauth.yandex.ru';

export const OAUTH_REDIRECT_URL = `${OAUTH_BASE_URL}/authorize?response_type=code&client_id=${OAUTH_CLIENT}`;

export const OUATH_TOKEN_URL = `${OAUTH_BASE_URL}/token`;

export const OAUTH_GET_USER_URL = 'https://login.yandex.ru/info';

export const DEFAULT_AVATAR = '31c7b7866eaf98009c0e';
