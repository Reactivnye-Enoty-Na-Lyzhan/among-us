export const RATINGS_FETCH_BATCH_SIZE = 3;

export const RATINGS_ON_MOUNT_MAX_COUNT = 12;

export enum EnumRatingTypes {
  GAMES = 'games',
  WINRATE = 'winrate',
  MAX_SCORE = 'maxScore',
}

export enum EnumRatingEntityIdentifiers {
  RATING_ID = 'ratingID',
  USER_LOGIN = 'userLogin',
}

export enum EnumRatingSListUpdateMethod {
  UPSERT,
  REPLACE,
}
