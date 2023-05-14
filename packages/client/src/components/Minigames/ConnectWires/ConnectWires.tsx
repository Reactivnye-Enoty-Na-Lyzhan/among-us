import React, { FC, useCallback, useState } from 'react';
import ConnWiresTile from './Tile/Tile';
import './ConnectWires.css';
import { INITIAL_STATE, TILES } from './constants';
import classNames from 'classnames';
import { TileData, TileParams } from './types';

const ConnectWires: FC = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);

  const handleTileClick = useCallback(
    (id: number) => {
      const newGameState = { ...gameState };

      const row = newGameState.tiles.find(r => r.some(c => c.id === id));

      if (row) {
        const tileData = row.find(t => t.id === id);
        console.log({ id, tileData });

        if (tileData) {
          const { rotate } = tileData;

          tileData.rotate = rotate >= 3 ? 0 : rotate + 1;
        }

        setGameState(newGameState);
      }

      checkIsWin();
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

  const checkIsWin = () => {
    let result = false;
    const row = gameState.wireStart;
    const col = 0;
    const tileData = gameState.tiles[gameState.wireStart][0];
    const tile = TILES.find(t => t.code === tileData.code);

    if (tile) {
      result = checkTile(tileData, tile, 4, row, col);
      if (result) {
        alert('You win!');
      }
      console.log(result);
    }

    return result;
  };

  const checkTile = (
    tileData: TileData,
    tile: TileParams,
    entry: number,
    row: number,
    col: number
  ) => {
    let actualWireEndA = tile.wireEndA;
    let actualWireEndB = tile.wireEndB;

    for (let i = 0; i < tileData.rotate; i++) {
      actualWireEndA = actualWireEndA === 4 ? 1 : actualWireEndA + 1;
      actualWireEndB = actualWireEndB === 4 ? 1 : actualWireEndB + 1;
    }
    console.log({
      tileData,
      tile,
      entry,
      row,
      col,
      actualWireEndA,
      actualWireEndB,
    });

    if (actualWireEndA === entry || actualWireEndB === entry) {
      console.log('FOUND');
      // Если один из концов соединяется с входом
      const isA = actualWireEndA === entry;
      let newRow: number | undefined = undefined;
      let newCol: number | undefined = undefined;
      let newEntry: number | undefined = undefined;

      if (col === 2 && (actualWireEndA === 2 || actualWireEndB === 2)) {
        if (row === gameState.wireEnd) {
          return true;
        }
      }

      switch (isA ? actualWireEndB : actualWireEndA) {
        case 1:
          // up
          if (row > 0) {
            newRow = row - 1;
            newCol = col;
            newEntry = 3;
          }
          break;
        case 2:
          // right
          if (col < 2) {
            newRow = row;
            newCol = col + 1;
            newEntry = 4;
          }
          break;
        case 3:
          // down
          if (row < 2) {
            newRow = row + 1;
            newCol = col;
            newEntry = 1;
          }
          break;
        case 4:
          // left
          if (col > 0) {
            newRow = row;
            newCol = col - 1;
            newEntry = 2;
          }
          break;
      }

      console.log({ newRow, newCol, newEntry });
      if (newRow !== undefined && newCol !== undefined && newEntry) {
        const newTileData = gameState.tiles[newRow][newCol];
        if (newTileData) {
          const newTile = TILES.find(t => t.code === newTileData?.code);
          if (newTile) {
            return checkTile(newTileData, newTile, newEntry, newRow, newCol);
          }
        }
      }
    }

    return false;
  };

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
