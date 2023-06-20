import { IPlayer } from '../../types/socket/game/gameSocket.types';

export const getWinState = (
  players: IPlayer[]
): 'civil' | 'impostor' | null => {
  if (!players.length) return null;

  const impostorsAlive = players.filter(
    player => player.role === 'impostor' && player.alive
  );

  const civilsAlive = players.filter(
    player => player.role === 'civil' && player.alive
  );

  if (impostorsAlive.length >= civilsAlive.length) return 'impostor';

  if (!impostorsAlive.length) return 'civil';

  return null;
};
