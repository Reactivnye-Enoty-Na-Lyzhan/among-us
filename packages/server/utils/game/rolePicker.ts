import { GameRole } from 'socket/game/gameSocket.types';
import { Game } from '../../models/game/game';

function getRandom(): GameRole {
  return Math.random() < 0.5 ? 'civil' : 'impostor';
}

export const roleDistributor = async (
  game: Game,
  gameId: number
): Promise<GameRole> => {
  const players = await game.getPlayers({
    where: {
      gameId,
    },
  });

  const playersCount = players.length;

  if (playersCount === 0) {
    return getRandom();
  }
  const { impostors: maxImpostors, players: gamePlayers } =
    await game.getParam();

  const civilsLeft = gamePlayers - maxImpostors;
  const civils = players.filter(player => player.role === 'civil').length;
  const impostors = playersCount - civils;

  if (impostors < maxImpostors) {
    if (civils < civilsLeft) {
      return getRandom();
    }

    return 'impostor';
  }

  return 'civil';
};
