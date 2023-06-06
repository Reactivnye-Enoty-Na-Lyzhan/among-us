import { PostRequestsHandler } from 'requests';
import type { Attributes } from 'sequelize';
import { LeaderBoard } from '../models/leaderboard';
import type { OmitKeys } from '../types/helpers';
import { WithMiddlewareErrorHandling } from '../utils/errors/handlers/withMiddlewareErrorHandler';

type GetLeaderboardRequestBody = {
  offset: number;
  limit: number;
  sortField: keyof LeaderBoard;
};
type GetLeaderboardResponseBody = OmitKeys<
  Attributes<LeaderBoard>,
  'userId' | 'id'
>[];

const _getLeaderboard: PostRequestsHandler<
  GetLeaderboardRequestBody,
  GetLeaderboardResponseBody
> = async (req, res) => {
  const { offset, limit, sortField } = req.body;

  const leaderBoard: GetLeaderboardResponseBody = await LeaderBoard.scope(
    'withUser'
  ).findAll({
    offset,
    limit,
    order: [[sortField, 'DESC']],
  });
  console.log(
    `GET LEADERBOARD: ${JSON.stringify(leaderBoard)}: ${typeof leaderBoard[0]}`
  );

  res.send(leaderBoard);
};

export const getLeaderboard = WithMiddlewareErrorHandling(_getLeaderboard);
