import { jsonOtherwiseTextHandler } from '@/utils/api/response-handlers';
import type {
  PostRatingRequestArgs,
  PostRatingRequestDTO,
} from '../leaderboard.api.types';
import { EnumRatingEntityIdentifiers } from '@-constants/leaderboard/ratings.constants';
import { API_PATH, TEAM_NAME } from '@-constants/leaderboard/api.constants';

export function postRatingQuery(ratingData: PostRatingRequestArgs) {
  const requestDTO: PostRatingRequestDTO = {
    data: {
      ...ratingData,
    },
    ratingFieldName: EnumRatingEntityIdentifiers.RATING_ID,
    teamName: TEAM_NAME,
  };

  return {
    url: API_PATH,
    method: 'POST',
    body: requestDTO,
    responseHandler: jsonOtherwiseTextHandler,
  };
}
