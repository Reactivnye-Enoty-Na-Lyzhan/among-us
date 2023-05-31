import { INITIAL_GAME_STATES, TILES } from './constants';
import { GameState, TileData, TileParams } from './types';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const randomizeGame = () => {
  const result = INITIAL_GAME_STATES[getRandomInt(INITIAL_GAME_STATES.length)];

  console.log('asdasdad');

  for (const tileRow of result.tiles) {
    for (const tile of tileRow) {
      tile.rotate = getRandomInt(4);
    }
  }

  return result;
};

export const checkIsWin = (gameState: GameState, onWinCallback: () => void) => {
  let result = false;
  const row = gameState.wireStart;
  const col = 0;
  const tileData = gameState.tiles[gameState.wireStart][0];
  const tile = TILES.find(t => t.code === tileData.code);

  if (tile) {
    result = checkTile(tileData, tile, 4, row, col, gameState);
    if (result) {
      onWinCallback();
    }
  }

  return result;
};

const checkTile = (
  tileData: TileData,
  tile: TileParams,
  entry: number,
  row: number,
  col: number,
  gameState: GameState
): boolean => {
  let actualWireEndA = tile.wireEndA;
  let actualWireEndB = tile.wireEndB;

  for (let i = 0; i < tileData.rotate; i++) {
    actualWireEndA = actualWireEndA === 4 ? 1 : actualWireEndA + 1;
    actualWireEndB = actualWireEndB === 4 ? 1 : actualWireEndB + 1;
  }

  if (actualWireEndA === entry || actualWireEndB === entry) {
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

    if (newRow !== undefined && newCol !== undefined && newEntry) {
      const newTileData = gameState.tiles[newRow][newCol];
      if (newTileData) {
        const newTile = TILES.find(t => t.code === newTileData?.code);
        if (newTile) {
          return checkTile(
            newTileData,
            newTile,
            newEntry,
            newRow,
            newCol,
            gameState
          );
        }
      }
    }
  }

  return false;
};
