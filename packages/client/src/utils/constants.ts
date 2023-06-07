const IS_DEV = import.meta.env.MODE === 'development';

const { VITE_SOCKET_HOST, VITE_SOCKET_PORT } = IS_DEV
  ? import.meta.env
  : process.env;

export const API_BASE_URL = '/api/';
export const SIGNIN_URL = '/signin';
export const SOCKET_BASE_URL = `${VITE_SOCKET_HOST}:${VITE_SOCKET_PORT}`;
export const OAUTH_API_PATH = 'oauth/';
export const DEFAULT_RESOURCE_URL = 'https://storage.yandexcloud.net/amongus';
