import { createContext } from 'react';
import { type Socket, io } from 'socket.io-client';
import type {
  IGameClienToServerEvents,
  IGameServerToClientEvents,
} from '../../../../server/types/socket/game/gameSocket.types';

export const gameSocket: Socket<
  IGameServerToClientEvents,
  IGameClienToServerEvents
> = io('/game', {
  path: '/gamesocket/',
  autoConnect: false,
  transports: ['websocket'],
});
export const GameSocketContext = createContext(gameSocket);
