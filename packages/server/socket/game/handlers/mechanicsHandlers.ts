import { Team } from '../../../models/team';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import { CIVIL_VICTORY_SCORE } from '../../../utils/constants';
import type {
  AssembleMeeting,
  CompleteTask,
  GameSocket,
  GameSocketNamespace,
} from '../../../types/socket/game/gameSocket.types';

export const mechanicsHandlers = (
  socket: GameSocket,
  io: GameSocketNamespace
) => {
  const assembleMeeting: AssembleMeeting = (gameId, initiatorId) => {
    io.to(gameId.toString()).emit('onEmergencyMeeting', initiatorId);
  };

  const completeTask: CompleteTask = async gameId => {
    try {
      const civilTeam = await Team.findOne({
        where: {
          gameId,
        },
      });

      if (!civilTeam) throw new NotExistError(ErrorMessages.gameNotExist);

      if (civilTeam.score >= CIVIL_VICTORY_SCORE) {
        io.to(gameId.toString()).emit('onGameEnd', 'civil');
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('assembleMeeting', assembleMeeting);
  socket.on('completeTask', completeTask);
};
