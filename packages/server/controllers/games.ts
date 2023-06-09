import { Op, literal } from 'sequelize';
import { Player } from '../models/game/player';
import { Game } from '../models/game/game';
import { User } from '../models/user';
import { Team } from '../models/game/team';
import { GameParam } from '../models/game/gameParam';
import { GameQueue } from '../models/game/gameQueue';
import { GameColor } from '../models/game/gameColor';
import { Chat } from '../models/chat/chat';
import { sequelize } from '../utils/connectDataBase';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import { NotExistError } from '../utils/errors/commonErrors/NotExistError';
import { ReachLimitsError } from '../utils/errors/gameErrors/ReachLimitsError';
import { NotInQueueError } from '../utils/errors/gameErrors/NotInQueueError';
import { AlreadyExistError } from '../utils/errors/commonErrors/AlreadyExistError';
import { roleDistributor } from '../utils/game/rolePicker';
import { getScore } from '../utils/game/getScore';
import { getImpostorsCount } from '../utils/game/getImpostorsCount';
import type { NextFunction, Request, Response } from 'express';
import type {
  GameParams,
  GameRole,
  SuitColorsType,
} from '../types/socket/game/gameSocket.types';

interface IBodyCompleteTask {
  gameId: number;
  taskId: number;
  playerId: number;
}

interface IBodyJoinGame {
  gameId: number;
  color: keyof SuitColorsType;
  role: GameRole;
}

interface IBodyTakeQueue {
  gameId: number;
}

interface IBodyGetGames {
  offset: number;
  limit: number;
}

interface IBodyFindGame {
  title: string;
  offset: number;
  limit: number;
}

interface IBodyCreateGame {
  title: string;
  params: Omit<GameParams, 'impostors'>;
}

interface IBodyLeaveGame {
  gameId: number;
  playerId?: number;
}

interface IBodyKillPlayer {
  userId: string;
}

interface IUser {
  id: number;
}

interface IRequest<T = unknown> extends Request {
  user?: IUser;
  body: T;
}

// Создание новой игры
export const createGame = async (
  req: IRequest<IBodyCreateGame>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { title, params } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const { result } = await sequelize.transaction(async () => {
      // Создаём игру
      const newGame = await Game.create({
        title,
        status: 'init',
        creatorId: id,
      });

      // Добавляем команды
      const teams = await Team.bulkCreate([
        {
          title: 'civils',
          role: 'civil',
          score: 0,
        },
        {
          title: 'impostors',
          role: 'impostor',
          score: 0,
        },
      ]);

      await Promise.all([
        newGame.createParam({
          discussion: params.discussion,
          players: params.players,
          impostors: getImpostorsCount(params.players),
          interval: params.interval,
          meetings: params.meetings,
        }),
        newGame.createColor({
          colors: {
            white: false,
            red: false,
            purple: false,
            aquamarine: false,
            green: false,
            yellow: false,
            blue: false,
            brown: false,
            grey: false,
          },
        }),
        newGame.createGameQueue({
          userId: id,
        }),
        newGame.setTeams(teams),
        newGame.createChat(),
        newGame.createMeeting(),
      ]);

      // Получаем готовый результат для отправки клиенту
      const result = await Game.findOne({
        where: {
          id: newGame.id,
        },
        include: [
          {
            model: GameParam,
            as: 'param',
          },
          {
            model: Chat,
            as: 'chat',
          },
        ],
      });

      return { result };
    });

    res.send(result);
  } catch (err: unknown) {
    console.log(err);
    next(err);
  }
};

// Получение списка всех игр
export const getGames = async (
  req: IRequest<IBodyGetGames>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { offset, limit } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Получаем все существующие игры со смещением и лимитом
    const foundGames = await Game.scope('withCreator').findAll({
      where: {
        status: 'init',
      },
      attributes: {
        include: [
          [
            literal(
              `(SELECT COUNT (*)::int  FROM players WHERE "gameId" = "Game"."id")`
            ),
            'players',
          ],
        ],
      },
      offset,
      limit,
      include: [
        {
          model: GameParam,
          as: 'param',
          attributes: ['players', 'meetings'],
        },
      ],
    });

    res.send({ foundGames });
  } catch (err: unknown) {
    console.log(err);
    next(err);
  }
};

// Поиск игр по условию
export const findGames = async (
  req: IRequest<IBodyFindGame>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { title, offset, limit } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Получаем все игры, соответствующие запросу, с учётом смещения и лимита
    const foundGames = await Game.scope('withCreator').findAll({
      where: {
        title: {
          [Op.iLike]: '%' + title + '%',
        },
        status: 'init',
      },
      attributes: {
        include: [
          [
            literal(
              `(SELECT COUNT (*)::int  FROM players WHERE "gameId" = "Game"."id")`
            ),
            'players',
          ],
        ],
      },
      offset,
      limit,
      include: [
        {
          model: GameParam,
          as: 'param',
          attributes: ['players', 'meetings'],
        },
      ],
    });

    res.send({
      games: foundGames,
    });
  } catch (err: unknown) {
    next(err);
  }
};

// Быстрый поиск игры
// На данный момент просто ищет игру, созданную раньше
export const findHotGame = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const game = await Game.findOne({
      where: {
        status: 'init',
      },
      order: [['id', 'ASC']],
      attributes: ['id'],
    });

    res.send({
      game,
    });
  } catch (err: unknown) {
    next(err);
  }
};

// Подключаемся к очереди в игру
export const takeQueue = async (
  req: IRequest<IBodyTakeQueue>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { gameId } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const foundGame = await Game.findOne({
      where: {
        id: gameId,
      },
    });

    const gameParam = await foundGame?.getParam();

    if (!foundGame || !gameParam)
      throw new NotExistError(ErrorMessages.gameNotExist);

    // Если нет места для подключения, сообщаем об этом пользователю
    if ((await foundGame.countGameQueues()) >= gameParam.players) {
      throw new ReachLimitsError(ErrorMessages.playerLimits);
    }

    // Проверяем, находится ли пользователь в очереди
    const queues = await foundGame.getGameQueues({
      where: {
        userId: id,
      },
    });

    if (queues.length > 0) {
      throw new AlreadyExistError(ErrorMessages.alreadyInQueue);
    }

    // Подключаем пользователя
    await foundGame.createGameQueue({
      userId: id,
    });

    // Получение игры с параметрами для передачи пользователю
    const game = await Game.findOne({
      where: {
        id: gameId,
      },
      include: [
        {
          model: Player,
          as: 'players',
          include: [
            {
              model: User,
              as: 'user',
              // Из пользователя получаем только login и nickname (может быть null)
              attributes: ['login', 'nickname'],
            },
          ],
        },
        {
          model: GameParam,
          as: 'param',
        },
        {
          model: GameColor,
          as: 'color',
        },
        {
          model: Chat,
          as: 'chat',
          attributes: ['id'],
        },
      ],
    });

    res.send(game);
  } catch (err: unknown) {
    next(err);
  }
};

// Подключение к игре
export const joinGame = async (
  req: IRequest<IBodyJoinGame>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { gameId, color } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Получение игры по id
    const foundGame = await Game.findOne({
      where: {
        id: gameId,
      },
    });

    const gameParam = await foundGame?.getParam();

    if (!foundGame || !gameParam)
      throw new NotExistError(ErrorMessages.gameNotExist);

    // Проверяем, подключён ли уже пользователь как игрок
    const players = await foundGame.getPlayers({
      where: {
        userId: id,
      },
    });

    if (players.length > 0) {
      throw new AlreadyExistError(ErrorMessages.alreadyConnected);
    }

    // Проверяем, находится ли пользователь в очереди
    const queues = await foundGame.getGameQueues({
      where: {
        userId: id,
      },
    });

    if (queues.length === 0) {
      throw new NotInQueueError(ErrorMessages.notInQueue);
    }

    // Если имеются свободные места
    if ((await foundGame.countPlayers()) >= gameParam.players) {
      throw new ReachLimitsError(ErrorMessages.playerLimits);
    }

    const player = await foundGame.createPlayer({
      alive: true,
      color,
      lastPosition: {
        x: 0,
        y: 0,
      },
      role: await roleDistributor(foundGame, gameId),
      score: 0,
      userId: id,
    });

    res.send({
      player,
    });
  } catch (err: unknown) {
    next(err);
  }
};

// Получение активной игры пользователя
export const getCurrentGame = async (
  req: IRequest<IUser>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Получаем активного персонажа (игрока) пользователя (игра имеет статус active или init)
    const player = await Player.findOne({
      where: {
        userId: id,
      },
      include: [
        {
          model: Game,
          as: 'game',
          where: {
            [Op.or]: [{ status: 'active' }, { status: 'init' }],
          },
        },
      ],
    });

    if (!player) {
      res.send({
        game: null,
      });

      return;
    }

    // Получение активной игры пользователя
    const game = await player.getGame({
      include: [
        {
          model: Player,
          as: 'players',
          include: [
            {
              model: User,
              as: 'user',
              // Из пользователя получаем только login и nickname (может быть null)
              attributes: ['login', 'nickname'],
            },
          ],
        },
        {
          model: GameParam,
          as: 'param',
        },
        {
          model: GameColor,
          as: 'color',
        },
        {
          model: Team,
          as: 'teams',
        },
      ],
    });

    res.send({ game });
  } catch (err: unknown) {
    next(err);
  }
};

export const killPlayer = async (
  req: IRequest<IBodyKillPlayer>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  try {
    const player = await Player.findOne({
      where: {
        id: userId,
      },
    });

    const newPlayer = await player?.update({
      alive: true,
    });

    res.send({
      player,
      newPlayer,
    });
  } catch (err: unknown) {
    console.log(err);
    next(err);
  }
};

// Выход пользователя из игры
export const leaveGame = async (
  req: IRequest<IBodyLeaveGame>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { gameId } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    await sequelize.transaction(async () => {
      // Получаем игру по id
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        throw new NotExistError(ErrorMessages.gameNotExist);
      }

      // Проверяем, существует ли player
      const player = await Player.findOne({
        where: {
          gameId,
        },
        include: [
          {
            model: User,
            as: 'user',
            where: {
              id,
            },
            attributes: [],
          },
        ],
      });

      // Если игрок найден - удаляем
      if (player) {
        await game.removePlayer(player);
        await player.destroy();
      }

      // Получаем место игрока в очереди
      const queue = await GameQueue.findOne({
        where: {
          gameId,
          userId: id,
        },
      });

      if (!queue) throw new NotInQueueError(ErrorMessages.notInQueue);

      // Удаляем игрока из очереди
      await game.removeGameQueue(queue);

      await queue.destroy();
    });

    res.send({
      gameId,
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const completeTask = async (
  req: IRequest<IBodyCompleteTask>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { gameId, taskId, playerId } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const player = await Player.findOne({
      where: {
        id: playerId,
      },
    });

    if (!player) throw new NotExistError(ErrorMessages.playerNotExist);

    const playerRole = player.role;

    const team = await Team.findOne({
      where: {
        gameId,
        role: playerRole,
      },
    });

    if (!team) throw new NotExistError(ErrorMessages.teamNotExist);

    const score = getScore(taskId);

    await team.update({
      score: team.score + score,
    });

    await team.save();

    res.send({
      score: team.score,
    });
  } catch (err: unknown) {
    next(err);
  }
};
