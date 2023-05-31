import React, { FC, useEffect, useState } from 'react';
import './Modal.css';
import { MINIGAMES } from '@/utils/constants';

type Props = {
  gameId: string;
  onWinCallback: () => void;
};

const MinigameModal: FC<Props> = ({ gameId, onWinCallback }) => {
  const [game, setGame] = useState<React.ReactNode | undefined>(undefined);

  useEffect(() => {
    const minigame = MINIGAMES.find(g => g.id === gameId);
    if (minigame) {
      const Game = minigame.component;
      if (Game) {
        setGame(<Game onWinCallback={onWinCallback} />);
      }
    }
  }, [gameId]);

  return (
    <div className="minigame-modal">
      <div className="minigame-modal__container">
        <div className="minigame-modal__content">{game}</div>
      </div>
    </div>
  );
};

export default MinigameModal;
