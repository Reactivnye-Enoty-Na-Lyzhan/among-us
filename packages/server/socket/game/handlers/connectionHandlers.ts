import { Game } from '../../../models/game/game';
import { Player } from '../../../models/game/player';
import { User } from '../../../models/user';
import { GameQueue } from '../../../models/game/gameQueue';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import { getWinState } from '../../../utils/game/getWinState';
import type {
  GameSocket,
  SetSocketPlayer,
  GetPlayers,
  JoinGame,
  LeaveGame,
  GameSocketNamespace,
  ReturnToGame,
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

  const setSocketPlayer: SetSocketPlayer = (gameId, playerId) => {
    if (!gameId || !playerId) return;

    socket.handshake.query.playerId = playerId.toString();
    socket.handshake.query.gameId = gameId.toString();
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

  const returnToGame: ReturnToGame = async (gameId, playerId, callback) => {
    const clients = io.adapter.rooms.get(gameId.toString());

    if (!clients) return;

    const randomClient = Array.from(clients).find(
      socketId => socketId !== socket.id
    );

    // Чтобы работало корректно, нужно получать всех игроков с их текущими позициями
    // Это позволит синхронизировать как текущего игрока.
    if (randomClient) {
      io.timeout(5000)
        .to(randomClient)
        .emit('onSyncPlayerPosition', playerId, (_err, coordinates) => {
          callback(coordinates[0]);
        });
    }
  };

  const handleDisconnect = async () => {
    try {
      const playerId = socket.handshake.query?.playerId;
      const gameId = socket.handshake.query?.gameId;

      if (!playerId || !gameId) return;

      const player = await Player.findOne({
        where: {
          id: Number(playerId),
        },
      });

      if (!player) return;

      const game = await player.getGame();

      const isPreparingGame =
        game.status === 'init' || game.status === 'preparing';

      if (!isPreparingGame) {
        io.to(gameId.toString()).emit('onPlayerKill', Number(playerId), true);

        const players = await game.getPlayers();

        if (!players) return;

        const winner = getWinState(players);

        if (winner) {
          io.to(gameId.toString()).emit('onGameEnd', winner);
          await game.update({
            status: 'finished',
          });
        }

        return;
      }

      const colors = await game.getColor();
      colors.colors[player.color] = false;
      colors.changed('colors', true);
      await colors.save();

      const user = await player.getUser();
      const queue = await GameQueue.findOne({
        where: {
          gameId,
          userId: user.id,
        },
      });

      if (queue) {
        await queue.destroy();
      }

      await player.destroy();

      socket.broadcast.to(gameId.toString()).emit('onLeaveGame');
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('joinGame', joinGame);
  socket.on('leaveGame', leaveGame);
  socket.on('setSocketPlayer', setSocketPlayer);
  socket.on('getPlayersAmount', getPlayers);
  socket.on('returnToGame', returnToGame);
  socket.on('disconnect', handleDisconnect);
};
