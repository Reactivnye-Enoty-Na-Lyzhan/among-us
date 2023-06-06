import type {
  EnumRatingSListUpdateMethod,
  EnumRatingTypes,
} from '@-constants/leaderboard/ratings.constants';

export type GetRatingsRequestSpecificArgs = {
  offset: number;
  limit: number;
  sortField?: EnumRatingTypes;
};
export type GetRatingsRequestEntityAdapterSpecificArgs = {
  ratingsListUpdateMethod?: EnumRatingSListUpdateMethod;
};
export type GetRatingsRequestArgs = GetRatingsRequestSpecificArgs &
  GetRatingsRequestEntityAdapterSpecificArgs;
export type GetRatingsRequestDTO = Required<GetRatingsRequestSpecificArgs>;
export type GetRatingsSuccessfulResponse = {
  games: number;
  wins: number;
  loses: number;
  winrate: number;
  user: {
    login: string;
    nickname: string;
    avatar: string;
  };
}[];
