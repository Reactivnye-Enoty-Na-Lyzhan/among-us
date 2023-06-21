import React, { FC, useEffect, useState } from 'react';
import { MINIGAMES } from '@/utils/game/mingames';
import './Modal.css';

type Props = {
  gameId: number;
  onWinCallback: () => void;
  onCloseCallback: () => void;
};

const MinigameModal: FC<Props> = ({
  gameId,
  onWinCallback,
  onCloseCallback,
}) => {
  const [game, setGame] = useState<React.ReactNode | undefined>(undefined);

  useEffect(() => {
    const Game = MINIGAMES[gameId]();
    console.log({ Game });
    setGame(<Game onWinCallback={onWinCallback} />);
  }, [gameId]);

  return (
    <div className="minigame-modal">
      <div className="minigame-modal__container">
        <button className="minigame-modal__close" onClick={onCloseCallback}>
          Закрыть
        </button>
        <div className="minigame-modal__content">{game}</div>
      </div>
    </div>
  );
};

export default MinigameModal;
