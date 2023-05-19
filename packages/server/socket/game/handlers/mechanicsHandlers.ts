import type {
  EmergencyMeeting,
  GameSocket,
  GameSocketNamespace,
} from '../../../types/socket/game/gameSocket.types';

export const mechanicsHandlers = (
  gameSocket: GameSocketNamespace,
  socket: GameSocket
) => {
  const assembleMeeting: EmergencyMeeting = initiatorId => {
    gameSocket.emit('emergencyMeeting', initiatorId);
  };

  socket.on('assembleMeeting', assembleMeeting);
};
