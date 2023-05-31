import React, { FC, useCallback, useEffect, useState } from 'react';
import ConnWiresTile from './Tile/Tile';
import './ConnectWires.css';
import { INITIAL_GAME_STATES, TILES } from './constants';
import classNames from 'classnames';
import { checkIsWin, randomizeGame } from './utils';

const ConnectWires: FC = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATES[0]);

  useEffect(() => {
    setGameState(randomizeGame());
  }, []);

  const handleTileClick = useCallback(
    (id: number) => {
      const newGameState = { ...gameState };

      const row = newGameState.tiles.find(r => r.some(c => c.id === id));

      if (row) {
        const tileData = row.find(t => t.id === id);

        if (tileData) {
          const { rotate } = tileData;

          tileData.rotate = rotate >= 3 ? 0 : rotate + 1;
        }

        setGameState(newGameState);
      }

      checkIsWin(newGameState);
    },
    [gameState]
  );

  const getConnTips = useCallback(
    (type: 'start' | 'end') => {
      const position =
        type === 'start' ? gameState.wireStart : gameState.wireEnd;
      const tips: any[] = [];

      for (let i = 0; i < 3; i++) {
        tips.push(
          <div
            key={i}
            className={classNames('connwires-tip', {
              'connwires-tip__active': i === position,
            })}></div>
        );
      }

      return tips;
    },
    [gameState]
  );

  const getConnTiles = useCallback(() => {
    const tiles: any[] = [];

    for (const row of gameState.tiles) {
      for (const col of row) {
        const tile = TILES.find(t => t.code === col.code);

        if (!tile) {
          return null;
        }

        tiles.push(
          <ConnWiresTile
            key={col.id}
            tile={tile}
            data={col}
            onClick={handleTileClick}
          />
        );
      }
    }

    return tiles;
  }, [gameState]);

  return (
    <div className="connwires">
      <div className="connwires-board">
        <div className="connwires-board__left">{getConnTips('start')}</div>
        <div className="connwires-grid">{getConnTiles()}</div>
        <div className="connwires-board__right">{getConnTips('end')}</div>
      </div>
    </div>
  );
};

export default ConnectWires;
