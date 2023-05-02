import type { EnumRatingEntityIdentifiers, EnumRatingTypes } from './constants';

export type RatingEntityMetrics = {
  [EnumRatingTypes.GAMES]: number;
  [EnumRatingTypes.WINRATE]: number;
  [EnumRatingTypes.MAX_SCORE]: number;
};
export type RatingEntityIdentifiers = {
  [EnumRatingEntityIdentifiers.RATING_ID]: number;
  [EnumRatingEntityIdentifiers.USER_LOGIN]: string;
};
export type PlayerRatingEntity = RatingEntityIdentifiers & RatingEntityMetrics;

type GetRatingsRequestSpecificArgs = {
  cursor: number;
  limit: number;
  ratingFieldName?: EnumRatingTypes;
};
type GetRatingsRequestEntityAdapterSpecificArgs = {
  needListRecreation?: boolean;
  isPrefetch?: boolean;
};
export type GetRatingsRequestArgs = GetRatingsRequestSpecificArgs &
  GetRatingsRequestEntityAdapterSpecificArgs;
export type GetRatingsRequestDTO = Required<GetRatingsRequestSpecificArgs>;
export type GetRatingsSuccessfulResponse = { data: PlayerRatingEntity }[];

export type PostRatingRequestArgs = PlayerRatingEntity;
export type PostRatingRequestDTO = {
  data: PlayerRatingEntity;
  ratingFieldName: EnumRatingEntityIdentifiers.RATING_ID;
  teamName: string;
};
export type PostRatingSuccessfulResponse = 'OK';
