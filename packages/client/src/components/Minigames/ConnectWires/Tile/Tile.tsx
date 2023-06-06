import React, { FC, memo } from 'react';
import './Tile.css';
import { TileData, TileParams } from '../types';
import classNames from 'classnames';

type Props = {
  tile: TileParams;
  data: TileData;
  onClick: (id: number) => void;
};

const ConnWiresTile: FC<Props> = ({ tile, data, onClick }) => {
  const rotation = 90 * data.rotate;

  return (
    <div
      onClick={() => {
        onClick(data.id);
      }}
      className={classNames('connwires-tile', `connwires-tile_${tile.code}`)}
      style={{ transform: `rotate(${rotation}deg)` }}></div>
  );
};

export default memo(ConnWiresTile);
