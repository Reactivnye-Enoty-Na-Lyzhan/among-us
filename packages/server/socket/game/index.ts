import type { baseSocketServer } from '../../types/socket/baseSocket.types';
import type { GameSocket, GameSocketNamespace } from '../../types/socket/game/gameSocket.types';
import { connectionHandlers } from './handlers/connectionHandlers';
import { movementSyncHandlers } from './handlers/movementSyncHandlers';
import { configurationHandlers } from './handlers/configurationHandlers';
import { playerInteractionHandlers } from './handlers/playerInteractionHandlers';
import { mechanicsHandlers } from './handlers/mechanicsHandlers';

export const connectGameSocket = (io: baseSocketServer) => {
  const gameSocket: GameSocketNamespace = io.of('/game');

  const onConnect = (socket: GameSocket) => {
    // Обработчики начала и завершения игры
    connectionHandlers(socket);

    // Синхронизация движения игроков
    movementSyncHandlers(socket);

    // Конфигурирование игры
    configurationHandlers(socket);

    // Взаимодействие игроков
    playerInteractionHandlers(socket);

    // Мехники
    mechanicsHandlers(gameSocket, socket);

    socket.on('disconnect', () => {
      console.log('соединение разорвано');
    });
  };

  gameSocket.on('connection', onConnect);
};
