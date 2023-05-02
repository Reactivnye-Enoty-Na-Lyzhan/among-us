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
