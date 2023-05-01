import { API_PATH, DEFAULT_RATING_FIELD, TEAM_NAME } from '../constants';
import type { EnumRatingTypes } from '../enumerations';
import type { PlayerRatingEntity } from '../leaderboard.api-types';

export type GetRatingsRequestArgs = {
  cursor: number;
  limit: number;
  ratingFieldName?: EnumRatingTypes;
  isPrefetch?: boolean;
};
export type GetRatingsRequestDTO = Required<GetRatingsRequestArgs>;
export type GetRatingsSuccessfulResponse = { data: PlayerRatingEntity }[];

export function getRatingsQuery({
  limit,
  cursor,
  ratingFieldName = DEFAULT_RATING_FIELD,
  isPrefetch = false,
}: GetRatingsRequestArgs) {
  const requestDTO: GetRatingsRequestDTO = {
    ratingFieldName,
    cursor,
    limit,
    isPrefetch,
  };

  return {
    url: `${API_PATH}/${TEAM_NAME}`,
    method: 'POST',
    body: requestDTO,
  };
}
