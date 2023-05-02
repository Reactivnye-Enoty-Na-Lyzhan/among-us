import { API_TEAM_NAME } from '@/utils/constants';

export enum EnumRatingTypes {
  GAMES = 'games',
  WINRATE = 'winrate',
  MAX_SCORE = 'maxScore',
}

export enum EnumRatingEntityIdentifiers {
  RATING_ID = 'ratingID',
  USER_LOGIN = 'userLogin',
}

export const API_PATH = 'leaderboard';

export const TEAM_NAME = `${API_TEAM_NAME}-experimental-1`;

export const DEFAULT_RATING_FIELD = EnumRatingTypes.MAX_SCORE;
