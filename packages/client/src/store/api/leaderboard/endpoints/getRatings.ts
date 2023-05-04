import {
  API_PATH,
  DEFAULT_RATING_FIELD,
  TEAM_NAME,
} from '@-constants/leaderboard/api.constants';
import type {
  GetRatingsRequestArgs,
  GetRatingsRequestDTO,
} from '../leaderboard.api.types';

export function getRatingsQuery({
  limit,
  cursor,
  ratingFieldName = DEFAULT_RATING_FIELD,
}: GetRatingsRequestArgs) {
  const requestDTO: GetRatingsRequestDTO = {
    ratingFieldName,
    cursor,
    limit,
  };

  return {
    url: `${API_PATH}/${TEAM_NAME}`,
    method: 'POST',
    body: requestDTO,
  };
}
