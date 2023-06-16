import { MeetingResults } from 'socket/game/gameSocket.types';

export const getVoteResult = (votedList: MeetingResults): number | null => {
  const resultsArray = Object.keys(votedList);
  if (!resultsArray.length) return null;

  if (resultsArray.length > 1) {
    const votedPlayers = resultsArray.sort((a, b) => {
      return votedList[Number(b)] - votedList[Number(a)];
    });
    const hasAdavantage =
      votedList[Number(votedPlayers[0])] > votedList[Number(votedPlayers[1])];

    if (hasAdavantage) {
      return Number(resultsArray[0]);
    }

    return null;
  }

  return Number(resultsArray[0]);
};
