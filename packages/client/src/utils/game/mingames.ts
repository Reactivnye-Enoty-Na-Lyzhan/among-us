import { FC } from 'react';
import ConnectWires from '@/components/Minigames/ConnectWires/ConnectWires';
import FindMatch from '@/components/Minigames/FindMatch/FindMatch';
import { Game as MemorizationGame } from '@/components/Minigames/SquareFragmentsMemorization/Game';

interface Props {
  onWinCallback: () => void;
}

interface IMiniGamesHash {
  [k: number]: () => FC<Props>;
}

export const MINIGAMES: IMiniGamesHash = {
  1: () => MemorizationGame,
  2: () => FindMatch,
  3: () => ConnectWires,
};

export const miniGamesList = Object.keys(MINIGAMES);
