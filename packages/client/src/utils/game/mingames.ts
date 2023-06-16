import { FC } from 'react';
import ConnectWires from '@/components/Minigames/ConnectWires/ConnectWires';
import FindMatch from '@/components/Minigames/FindMatch/FindMatch';
import { Game } from '@/components/Minigames/SquareFragmentsMemorization/Game';

interface Props {
  onWinCallback: () => void;
}

interface IMiniGamesHash {
  [k: number]: () => FC<Props>;
}
export const MINIGAMES: IMiniGamesHash = {
  1: () => ConnectWires,
  2: () => FindMatch,
  3: () => Game,
};
