import { Game } from '../../../models/game/game';
import { User } from '../../../models/user';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  GameSocket,
  SetPlayerReady,
  GetPlayers,
  JoinGame,
  LeaveGame,
  GameSocketNamespace,
} from '../../../types/socket/game/gameSocket.types';

export const connectionHandlers = (
  socket: GameSocket,
  io: GameSocketNamespace
) => {
  // Подключаем пользователя к комнате
  const joinGame: JoinGame = gameId => {
    socket.join(gameId.toString());
    socket.to(gameId.toString()).emit('onPlayerJoin'); // Попробовать через leave socket убирать игрока из игры...?
  };

  const leaveGame: LeaveGame = gameId => {
    socket.broadcast.to(gameId.toString()).emit('onLeaveGame');
  };

  const setPlayerReady: SetPlayerReady = playerId => {
    console.log('Player: ', playerId);
  };

  const getPlayers: GetPlayers = async (gameId, callback) => {
    try {
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });

      if (!game) throw new NotExistError(ErrorMessages.gameNotExist);

      const players = await game.getPlayers({
        include: {
          model: User,
          as: 'user',
          attributes: ['nickname', 'login'],
        },
      });

      const { players: gamePlayers } = await game.getParam();

      callback(players.length);

      if (players.length === gamePlayers) {
        await game.update({
          status: 'active',
        });

        io.to(gameId.toString()).emit('onGameReady', players);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('joinGame', joinGame);
  socket.on('leaveGame', leaveGame);
  socket.on('playerReady', setPlayerReady);
  socket.on('getPlayersAmount', getPlayers);
};
