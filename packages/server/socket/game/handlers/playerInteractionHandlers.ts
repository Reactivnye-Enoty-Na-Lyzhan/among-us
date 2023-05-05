import { GameSocket, KillPlayer } from '../../../types/socket/game/gameSocket.types';

export const playerInteractionHandlers = (socket: GameSocket) => {
  const killPlayer: KillPlayer = (id, callback) => {
    callback(id);
  };

  socket.on('killPlayer', killPlayer);
};
