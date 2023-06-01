import React, { FC, useEffect, useState } from 'react';
import { MINIGAMES } from '@/utils/game/mingames';
import './Modal.css';

type Props = {
  gameId: number;
  onWinCallback: () => void;
};

const MinigameModal: FC<Props> = ({ gameId, onWinCallback }) => {
  const [game, setGame] = useState<React.ReactNode | undefined>(undefined);

  useEffect(() => {
    const Game = MINIGAMES[gameId]();
    setGame(<Game onWinCallback={onWinCallback} />);
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
