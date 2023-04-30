export enum EnumRatingTypes {
  GAMES = 'games',
  WINRATE = 'winrate',
  RANK = 'rank',
}
export type RatingEntityMetrics = {
  [EnumRatingTypes.GAMES]: number;
  [EnumRatingTypes.WINRATE]: number;
  [EnumRatingTypes.RANK]: number;
};
export const DEFAULT_RATING_FIELD = EnumRatingTypes.RANK;

export enum EnumRatingEntityIdentifiers {
  RATING_ID = 'ratingID',
  USER_ID = 'userID',
}
export type RatingEntityIdentifiers = {
  [EnumRatingEntityIdentifiers.RATING_ID]: string;
  [EnumRatingEntityIdentifiers.USER_ID]: number;
};

export type PlayerRatingEntity = RatingEntityIdentifiers & RatingEntityMetrics;

export type PostRatingSuccessfulResponse = 'OK';

export type PostRatingRequestDTO = {
  data: PlayerRatingEntity;
  ratingFieldName: EnumRatingEntityIdentifiers.RATING_ID;
  teamName: string;
};

export type PostRatingRequestArgs = PlayerRatingEntity;

export type GetRatingsRequestArgs = {
  cursor: number;
  limit: number;
  ratingFieldName?: EnumRatingTypes;
};
