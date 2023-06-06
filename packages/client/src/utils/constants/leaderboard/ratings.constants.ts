export const RATINGS_FETCH_BATCH_SIZE = 3;

export const RATINGS_ON_MOUNT_MAX_COUNT = 12;

export enum EnumRatingTypes {
  GAMES = 'games',
  WINS = 'wins',
  LOSSES = 'losses',
  WINRATE = 'winrate',
}

export enum EnumRatingSListUpdateMethod {
  UPSERT,
  REPLACE,
}
