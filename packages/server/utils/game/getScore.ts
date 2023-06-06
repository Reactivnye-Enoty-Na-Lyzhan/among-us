export const getScore = (id: number): number => {
  switch (id) {
    case 1:
      return 320;
    case 2:
      return 150;
    case 3:
      return 200;
    default:
      return 100;
  }
};
