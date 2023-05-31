import ConnectWires from '@/components/Minigames/ConnectWires/ConnectWires';

export const API_BASE_URL = '/api/';
export const API_TEAM_NAME = 'enoty';
export const SIGNIN_URL = '/signin';
export const SOCKET_BASE_URL = 'localhost:3001';
export const OAUTH_API_PATH = 'oauth/';
export const DEFAULT_RESOURCE_URL = 'https://storage.yandexcloud.net/amongus';

export const MINIGAMES = [
  {
    id: 'connwires',
    component: ConnectWires,
  },
];
