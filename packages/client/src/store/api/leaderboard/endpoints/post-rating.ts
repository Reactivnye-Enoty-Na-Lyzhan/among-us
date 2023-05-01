import { jsonOtherwiseTextHandler } from '@/utils/api/response-handlers';
import { API_PATH, TEAM_NAME } from '../constants';
import type { PlayerRatingEntity } from '../leaderboard.api-types';
import { EnumRatingEntityIdentifiers } from '../enumerations';

export type PostRatingRequestArgs = PlayerRatingEntity;
export type PostRatingRequestDTO = {
  data: PlayerRatingEntity;
  ratingFieldName: EnumRatingEntityIdentifiers.RATING_ID;
  teamName: string;
};
export type PostRatingSuccessfulResponse = 'OK';

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
