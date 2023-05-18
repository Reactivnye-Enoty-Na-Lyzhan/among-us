import {
  EndMove,
  GameSocket,
  Move,
} from '../../../types/socket/game/gameSocket.types';

export const movementSyncHandlers = (socket: GameSocket) => {
  // TODO: playerMoving
  const move: Move = ({ id, x, y }) => {
    // Трансилруем событие всем, кроме инициатора
    socket.broadcast.emit('move', { id, x, y });
  };

  const endMove: EndMove = id => {
    // Трансилруем событие всем, кроме инициатора
    socket.broadcast.emit('endMove', id);
  };

  socket.on('move', move);
  socket.on('endMove', endMove);
};
