import { API_PATH, DEFAULT_RATING_FIELD, TEAM_NAME } from '../constants';
import type { EnumRatingTypes } from '../enumerations';
import type { PlayerRatingEntity } from '../leaderboard.types';

export type GetRatingsRequestArgs = {
  cursor: number;
  limit: number;
  ratingFieldName?: EnumRatingTypes;
};
export type GetRatingsRequestDTO = Required<GetRatingsRequestArgs>;
export type GetRatingsSuccessfulResponse = { data: PlayerRatingEntity }[];

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
