import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboards';
import { getLeaderboardValidation } from '../utils/validation/requestValidation';

const router = Router();

// Получить все результаты таблицы рейтинга
router.post('/', getLeaderboardValidation, getLeaderboard);

export default router;
