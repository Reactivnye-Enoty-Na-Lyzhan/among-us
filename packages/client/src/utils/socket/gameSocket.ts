import { createContext } from 'react';
import { type Socket, io } from 'socket.io-client';
import { SOCKET_BASE_URL } from '../constants';
import type {
  IGameClienToServerEvents,
  IGameServerToClientEvents,
} from '../../../../server/types/socket/game/gameSocket.types';

export const gameSocket: Socket<IGameServerToClientEvents, IGameClienToServerEvents> = io(`${SOCKET_BASE_URL}/game`, {
  autoConnect: false,
});
export const GameSocketContext = createContext(gameSocket);
