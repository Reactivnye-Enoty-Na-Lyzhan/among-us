import { Player } from '../../../models/player';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  GameSocket,
  KillPlayer,
} from '../../../types/socket/game/gameSocket.types';

export const playerInteractionHandlers = (socket: GameSocket) => {
  const killPlayer: KillPlayer = async (id, callback) => {
    try {
      const player = await Player.findOne({
        where: {
          id,
        },
      });

      if (!player) throw new NotExistError(ErrorMessages.playerNotExist);

      player.alive = false;
      
      await player.save();
      callback(id);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('killPlayer', killPlayer);
};
