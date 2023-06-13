import dotenv from 'dotenv';
import path from 'path';

if (!process.env.NODE_ENV) {
  dotenv.config({
    path: '../../../.env',
  });
}

const {
  NODE_ENV,
  OAUTH_CLIENT,
  APP_HOST = 'localhost',
  VITE_SOCKET_HOST,
  VITE_SOCKET_PORT,
} = process.env;

export const DEFAULT_SUCCESSFUL_RESPONSE = 'OK';

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE =
  'Что-то пошло не так на стороне сервера...';

export const BAD_REQUEST_CODE = 400;

export const NOT_FOUNT_CODE = 404;
export const NOT_FOUNT_MESSAGE =
  'Страница или документ не найден. Попробуйте ещё раз';

export const IS_DEV = NODE_ENV === 'development';

export const CLIENT_PACKAGE_PATH = path.resolve(
  __dirname,
  `${IS_DEV ? '../../client' : '../../../client'}`
);

export const CIVIL_VICTORY_SCORE = 1200;

export const CURRENT_HOST = APP_HOST;

export const MAX_UPLOAD_IMAGE_SIZE = 0.5 * Math.pow(1024, 2);

const OAUTH_BASE_URL = 'https://oauth.yandex.ru';

export const OAUTH_REDIRECT_URL = `${OAUTH_BASE_URL}/authorize?response_type=code&client_id=${OAUTH_CLIENT}`;

export const OUATH_TOKEN_URL = `${OAUTH_BASE_URL}/token`;

export const OAUTH_GET_USER_URL = 'https://login.yandex.ru/info';

export const DEFAULT_AVATAR = '31c7b7866eaf98009c0e';

export const SOCKET_ORIGIN = `${VITE_SOCKET_HOST}:${VITE_SOCKET_PORT}`;
