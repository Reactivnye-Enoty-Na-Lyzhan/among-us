import { sequelize } from '../../../utils/connectDataBase';
import { GameColor } from '../../../models/game/gameColor';
import { LeaderBoard } from '../../../models/leaderboard';
import { Player } from '../../../models/game/player';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import { getWinrate } from '../../../utils/game/getWinrate';
import type {
  GameSocket,
  GetSelectedColors,
  SelectColor,
  SetPlayerRating,
  UnselectColor,
} from '../../../types/socket/game/gameSocket.types';

export const configurationHandlers = (socket: GameSocket) => {
  // Выбор цвета игроком
  const selectColor: SelectColor = async (
    gameId,
    color,
    oldColor,
    callback
  ) => {
    if (!gameId) throw new NotExistError(ErrorMessages.gameNotExist);

    try {
      const colorsTable = await GameColor.findOne({
        where: {
          gameId,
        },
      });

      if (!colorsTable) throw new NotExistError(ErrorMessages.gameNotExist);

      const playerColors = colorsTable.colors;

      if (oldColor) {
        playerColors[oldColor] = false;
      }

      playerColors[color] = true;

      colorsTable.changed('colors', true);
      await colorsTable.save();

      // Отдаём клиенту
      callback(color);
      // Возвращаем всем, кроме текущего клиента, объект со всеми цветами
      socket.to(gameId.toString()).emit('selectedColors', color, oldColor);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Получение "занятых" цветов
  const getSelectedColors: GetSelectedColors = async (gameId, callback) => {
    try {
      const colorsTable = await GameColor.findOne({
        where: {
          gameId,
        },
      });

      if (!colorsTable) throw new NotExistError(ErrorMessages.gameNotExist);

      callback(colorsTable.colors);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Если пользователь выходит или что-то ещё, освобождаем его цвет
  const unselectColor: UnselectColor = async (gameId, color) => {
    try {
      await sequelize.transaction(async () => {
        const colorsTable = await GameColor.findOne({
          where: {
            gameId,
          },
        });

        if (!colorsTable) throw new NotExistError(ErrorMessages.gameNotExist);

        const playerColors = colorsTable.colors;
        playerColors[color] = false;
        colorsTable.changed('colors', true);
        await colorsTable.save();

        return { playerColors };
      });

      socket.broadcast
        .to(gameId.toString())
        .emit('selectedColors', color, color);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Устанавливаем рейтинг пользователя с сервера
  const setPlayerRating: SetPlayerRating = async (playerId, winner) => {
    try {
      const player = await Player.findOne({
        where: {
          id: playerId,
        },
      });

      if (!player) throw new NotExistError(ErrorMessages.playerNotExist);

      const user = await player.getUser();

      // Проверяем, является ли команда пользователя победителями
      const isWinner = player.role === winner;

      const [leaderBoard] = await LeaderBoard.findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: {
          wins: 0,
          losses: 0,
        },
      });

      // Обновляем результаты пользователя
      if (isWinner) {
        await leaderBoard.increment(['wins', 'games']);
      } else {
        await leaderBoard.increment(['losses', 'games']);
      }

      const winrate = getWinrate(leaderBoard.wins, leaderBoard.losses);

      await leaderBoard.update({
        winrate,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('setPlayerRating', setPlayerRating);
  socket.on('selectColor', selectColor);
  socket.on('getSelectedColors', getSelectedColors);
  socket.on('unselectColor', unselectColor);
};
