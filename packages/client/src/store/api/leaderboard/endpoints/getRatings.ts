import { API_PATH, DEFAULT_RATING_FIELD, TEAM_NAME } from '../constants';
import type { EnumRatingTypes } from '../constants';
import type { PlayerRatingEntity } from '../leaderboard.api.types';

type RequestArgs = {
  cursor: number;
  limit: number;
  ratingFieldName?: EnumRatingTypes;
};

type EntityAdapterArgs = {
  needListRecreation?: boolean;
  isPrefetch?: boolean;
};

export type GetRatingsRequestArgs = RequestArgs & EntityAdapterArgs;
export type GetRatingsRequestDTO = Required<RequestArgs>;
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
