import { FC } from 'react';
import ConnectWires from '@/components/Minigames/ConnectWires/ConnectWires';

interface Props {
  onWinCallback: () => void;
};

interface IMiniGamesHash {
  [k: number]: () => FC<Props>,
}
export const MINIGAMES: IMiniGamesHash = {
  1: () => ConnectWires,
};
