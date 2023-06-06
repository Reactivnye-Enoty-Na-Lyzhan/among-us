import { IPlayerWithUser } from '@/store/game/game.types';

export const sortPlayer = (
  currentPlayer: IPlayerWithUser['id'],
  players: IPlayerWithUser[]
): IPlayerWithUser[] => {
  const sortedPlayers: IPlayerWithUser[] = [];

  players.forEach(player => {
    if (player.id === currentPlayer) {
      return sortedPlayers.unshift(player);
    }

    if (!player.alive) {
      return sortedPlayers.push(player);
    }

    return sortedPlayers.push(player);
  });

  return sortedPlayers;
};
