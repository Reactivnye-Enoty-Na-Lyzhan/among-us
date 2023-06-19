import { createContext } from 'react';
import { io, type Socket } from 'socket.io-client';
import type {
  IGameClientToServerEvents,
  IGameServerToClientEvents,
} from '../../../../server/types/socket/game/gameSocket.types';

export const gameSocket: Socket<
  IGameServerToClientEvents,
  IGameClientToServerEvents
> = io('/game', {
  path: '/gamesocket/',
  autoConnect: false,
  transports: ['websocket'],
});
export const GameSocketContext = createContext(gameSocket);
