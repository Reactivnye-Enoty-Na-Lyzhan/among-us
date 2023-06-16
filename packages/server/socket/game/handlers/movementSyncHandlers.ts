import {
  EndMove,
  GameSocket,
  MoveClient,
} from '../../../types/socket/game/gameSocket.types';

export const movementSyncHandlers = (socket: GameSocket) => {
  // TODO: playerMoving
  const move: MoveClient = ({ id, x, y, gameId }) => {
    // Трансилруем событие всем, кроме инициатора
    socket.broadcast.to(gameId.toString()).emit('move', { id, x, y });
  };

  const endMove: EndMove = id => {
    // Трансилруем событие всем, кроме инициатора
    socket.broadcast.emit('endMove', id);
  };

  socket.on('move', move);
  socket.on('endMove', endMove);
};
