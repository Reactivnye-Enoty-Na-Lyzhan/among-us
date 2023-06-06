type PlayerRatingRecord = {
  games: number;
  wins: number;
  loses: number;
  winrate: number;
  userLogin: string;
};
export type PostRatingRequestArgs = PlayerRatingRecord;
export type PostRatingRequestDTO = {
  data: PlayerRatingRecord;
};
export type PostRatingSuccessfulResponse = 'OK';
