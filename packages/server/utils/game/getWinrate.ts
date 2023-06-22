export const getWinrate = (wins: number, losses: number): number => {
  if (losses === 0) return wins * 100;

  return Math.floor((wins / losses) * 100);
};
