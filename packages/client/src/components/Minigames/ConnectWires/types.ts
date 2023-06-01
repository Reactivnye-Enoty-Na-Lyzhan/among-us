export interface TileParams {
  code: string;
  wireEndA: number;
  wireEndB: number;
}

export interface TileData {
  id: number;
  code: string;
  rotate: number;
}

export interface GameState {
  wireStart: number;
  wireEnd: number;
  tiles: TileData[][];
}
