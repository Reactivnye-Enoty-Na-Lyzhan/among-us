import { EnumRatingTypes } from '@/utils/constants/leaderboard/ratings.constants';
import { EntityState } from '@reduxjs/toolkit';

export interface ILeaderboardState {
  sortingType: EnumRatingTypes;
  fetchedRatingsCount: number;
  ratingsList: EntityState<PlayerRatingRecord>;
}

export type PlayerRatingMetrics = {
  games: number;
  wins: number;
  loses: number;
  winrate: number;
};

export type RatingRecordUserInfo = {
  userLogin: string;
  userNickname: string;
  userAvatar: string;
};

export type PlayerRatingRecord = PlayerRatingMetrics & RatingRecordUserInfo;
