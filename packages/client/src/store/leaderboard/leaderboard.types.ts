import { EnumRatingTypes } from "@/utils/constants/leaderboard/ratings.constants";
import { EntityState } from "@reduxjs/toolkit";
import { PlayerRatingEntity } from "../api/leaderboard/leaderboard.api.types";

export interface ILeaderboardState {
  sortingType: EnumRatingTypes,
  fetchedRatingsCount: number,
  ratingsList: EntityState<PlayerRatingEntity>,
}
