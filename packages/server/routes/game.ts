import { Router } from 'express';
import {
  completeTask,
  createGame,
  findGames,
  findHotGame,
  getCurrentGame,
  getGames,
  joinGame,
  killPlayer,
  leaveGame,
  takeQueue,
} from '../controllers/games';
import {
  completeTaskValidation,
  createGameValidation,
  findGamesValidation,
  joinGameValidation,
  leaveGameValidation,
  takeQueueValidation,
} from '../utils/validation/requestValidation';

const router = Router();

// Получить список игр
router.get('/', getGames);

// Быстрый поиск игры
router.get('/hot', findHotGame);

// Получить текущую игру пользователя
router.get('/current', getCurrentGame);

// Найти игру по названию
router.post('/find', findGamesValidation, findGames);

// Создание игры
router.post('/create', createGameValidation, createGame);

// Добавление игрока в очередь к игре
router.post('/queue', takeQueueValidation, takeQueue);

// Подключение в игру (создание персонажа)
router.post('/join', joinGameValidation, joinGame);

// Убийство персонажа
router.patch('/kill', killPlayer);

// Обонвление счёта команды
router.patch('/score', completeTaskValidation, completeTask);

// Выход из игры
router.delete('/leave', leaveGameValidation, leaveGame);

export default router;
