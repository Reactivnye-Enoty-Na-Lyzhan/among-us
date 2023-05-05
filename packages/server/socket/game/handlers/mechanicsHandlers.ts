import { CompleteTask, EmergencyMeeting, GameSocket, GameSocketNamespace } from '../../../types/socket/game/gameSocket.types';

export const mechanicsHandlers = (gameSocket: GameSocketNamespace, socket: GameSocket) => {
  const completeTask: CompleteTask = (taskId) => {
    console.log(taskId);
  };

  const assembleMeeting: EmergencyMeeting = (initiatorId) => {
    gameSocket.emit('emergencyMeeting', initiatorId);
  };

  socket.on('completeTask', completeTask);
  socket.on('assembleMeeting', assembleMeeting);
};
