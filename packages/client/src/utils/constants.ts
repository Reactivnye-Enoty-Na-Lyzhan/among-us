export const API_BASE_URL = '/api/';
export const SIGNIN_URL = '/signin';
export const SOCKET_BASE_URL = `${import.meta.env.VITE_SOCKET_HOST}:${
  import.meta.env.VITE_SOCKET_PORT
}`;
export const OAUTH_API_PATH = 'oauth/';
export const DEFAULT_RESOURCE_URL = 'https://storage.yandexcloud.net/amongus';
console.log(import.meta.env, SOCKET_BASE_URL, 'test');
