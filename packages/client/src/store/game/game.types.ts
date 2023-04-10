export interface IGameState {
  title: string;
  params: IGameStateParams;
}

export interface IGameStateParams {
  imposters: number;
  emergencyMeetings: number;
  votingTime: number;
  emergencyCountdown: number;
}
