export const getWinrate = (wins: number, losses: number): number => {
  if (losses === 0) return wins;

  return Math.floor((wins / losses) * 100);
};
