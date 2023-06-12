export const getImpostorsCount = (players: number): number => {
  if (players <= 5) return 1;
  if (players === 6) return 2;
  if (players === 7) return 2;

  return 3;
};
