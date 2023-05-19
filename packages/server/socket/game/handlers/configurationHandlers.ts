import { sequelize } from '../../../utils/connectDataBase';
import { GameColor } from '../../../models/gameColor';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import type {
  ColorSelect,
  GameSocket,
  GetSelectedColors,
  UnselectColor,
} from '../../../types/socket/game/gameSocket.types';

export const configurationHandlers = (socket: GameSocket) => {
  // раскоммитить gameId
  // Выбор цвета игроком
  const selectColor: ColorSelect = async (color, oldColor, /* gameId, */ callback) => {
    console.log(socket.rooms, socket.rooms.has('1'));
    try {
      const colorsTable = await GameColor.findOne({
        where: {
               gameId: socket.rooms.has('1') ? 1 : 2,
        },
      });

      if (!colorsTable) throw new NotExistError(ErrorMessages.gameNotExist);

      const playerColors = colorsTable.colors;

      playerColors[oldColor] = false;
      playerColors[color] = true;

      colorsTable.changed('colors', true);
      await colorsTable.save();

      // Отдаём клиенту
      callback(color);
      // Возвращаем всем, кроме текущего клиента, объект со всеми цветами
      socket.emit('selectedColors', playerColors);
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
      const { playerColors } = await sequelize.transaction(async () => {
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

      socket.broadcast.emit('selectedColors', playerColors);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('colorSelect', selectColor);
  socket.on('getSelectedColors', getSelectedColors);
  socket.on('unselectColor', unselectColor);
};
