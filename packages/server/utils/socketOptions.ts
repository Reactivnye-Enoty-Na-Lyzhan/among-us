import { SOCKET_ORIGIN } from './constants';

export const socketOptions = {
  cors: {
    origin: SOCKET_ORIGIN,
  },
  connectTimeout: 30000,
  pingTimeout: 25000,
  transport: ['websocket'],
};
