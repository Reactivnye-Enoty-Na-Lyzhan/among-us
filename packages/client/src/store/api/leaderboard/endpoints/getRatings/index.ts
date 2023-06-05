import {
  API_PATH,
  DEFAULT_RATING_FIELD,
} from '@-constants/leaderboard/api.constants';
import type { PlayerRatingRecord } from '@/store/leaderboard/leaderboard.types';
import type { EndpointDefinitions, ExtendedAPISlice } from '../../api.types';
import type {
  GetRatingsRequestArgs,
  GetRatingsRequestDTO,
  GetRatingsSuccessfulResponse,
} from './types';

export function getRatingsQuery({
  limit,
  offset,
  sortField = DEFAULT_RATING_FIELD,
}: GetRatingsRequestArgs) {
  const requestDTO: GetRatingsRequestDTO = {
    sortField,
    offset,
    limit,
  };

  return {
    url: `${API_PATH}`,
    method: 'POST',
    body: requestDTO,
  };
}

export function injectGetRatingsEndpoint<
  InputDefinitions extends EndpointDefinitions
>(apiSlice: ExtendedAPISlice<InputDefinitions>) {
  const extendedAPI = apiSlice.injectEndpoints({
    endpoints: build => ({
      getRatings: build.query<PlayerRatingRecord[], GetRatingsRequestArgs>({
        query: getRatingsQuery,
        transformResponse: (response: GetRatingsSuccessfulResponse) => {
          const ratingsList = response.map(ratingEntry => {
            const { games, wins, loses, winrate, user } = ratingEntry;
            return {
              games,
              wins,
              loses,
              winrate,
              userLogin: user.login,
              userAvatar: user.avatar,
              userNickname: user.nickname,
            };
          });

          return ratingsList;
        },
      }),
    }),
  });

  return extendedAPI;
}
