/* import { Player } from '../../../models/player'; */
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  GameSocket,
  GameSocketNamespace,
  KillPlayer,
} from '../../../types/socket/game/gameSocket.types';
import { Game } from '../../../models/game';
import { WrongDataError } from '../../../utils/errors/commonErrors/WrongDataError';

export const playerInteractionHandlers = (socket: GameSocket, io: GameSocketNamespace) => {
  const killPlayer: KillPlayer = async (gameId, targetId) => {
    try {
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });

      if (!game) throw new NotExistError(ErrorMessages.gameNotExist);

      const players = await game?.getPlayers();

      if (!players) throw new WrongDataError(ErrorMessages.gameNotExist);

      const targetPlayer = players.find((player) => player.id === targetId);

      if (!targetPlayer) throw new WrongDataError(ErrorMessages.playerNotExist);

      await targetPlayer.update({
        alive: false,
      });

      const impostorsAlive = players.filter((player) => player.role === 'impostor' && player.alive);
      const civilsAlive = players.filter((player) => player.role === 'civil' && player.alive);

      io.to(gameId.toString()).emit('onPlayerKill', targetId);

      if (impostorsAlive.length >= civilsAlive.length) {
        console.log('asdasdasd');
        io.to(gameId.toString()).emit('onGameEnd', 'impostor');
      }

    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('killPlayer', killPlayer);
};
