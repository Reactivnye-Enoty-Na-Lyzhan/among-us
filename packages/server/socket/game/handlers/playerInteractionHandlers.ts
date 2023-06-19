/* import { Player } from '../../../models/player'; */
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  GameSocket,
  GameSocketNamespace,
  KillPlayer,
} from '../../../types/socket/game/gameSocket.types';
import { Game } from '../../../models/game/game';
import { WrongDataError } from '../../../utils/errors/commonErrors/WrongDataError';
import { getWinState } from '../../../utils/game/getWinState';

export const playerInteractionHandlers = (
  socket: GameSocket,
  io: GameSocketNamespace
) => {
  const killPlayer: KillPlayer = async (gameId, targetId, fromMeeting) => {
    try {
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });

      if (!game) throw new NotExistError(ErrorMessages.gameNotExist);

      const players = await game?.getPlayers();

      if (!players) throw new WrongDataError(ErrorMessages.gameNotExist);

      const targetPlayer = players.find(player => player.id === targetId);

      if (!targetPlayer) throw new WrongDataError(ErrorMessages.playerNotExist);

      await targetPlayer.update({
        alive: false,
      });

      io.to(gameId.toString()).emit('onPlayerKill', targetId, fromMeeting);

      const winner = getWinState(players);

      if (winner) {
        io.to(gameId.toString()).emit('onGameEnd', winner);

        await game.update({
          status: 'finished',
        });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('killPlayer', killPlayer);
};
