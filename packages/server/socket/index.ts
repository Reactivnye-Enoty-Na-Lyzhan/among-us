import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { connectGameSocket } from './game';
import { socketOptions } from '../utils/socketOptions';
import type { baseSocketServer } from '../types/socket/baseSocket.types';

export const connectIO = (server: HTTPServer) => {
  const io: baseSocketServer = new Server(server, socketOptions);

  // Подключение game namespace
  connectGameSocket(io);
};
