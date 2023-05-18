import {
  Model,
  DataTypes,
  type BelongsToGetAssociationMixin,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

import { User } from './user';
import { Game } from './game';
import { sequelize } from '../utils/connectDataBase';
import type {
  GameRole,
  SuitColorsType,
} from '../types/socket/game/gameSocket.types';

interface IPlayerPosition {
  x: number;
  y: number;
}

export class Player extends Model<
  InferAttributes<Player>,
  InferCreationAttributes<Player>
> {
  declare id: CreationOptional<number>;
  declare role: GameRole;
  declare color: keyof SuitColorsType;
  declare lastPosition: IPlayerPosition;
  declare score: number;
  declare alive: boolean;
  declare userId: ForeignKey<User['id']>;
  declare gameId: ForeignKey<Game['id']>;
  declare getGame: BelongsToGetAssociationMixin<Game>;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'civil',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastPosition: {
      type: DataTypes.JSON,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    alive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'players',
    timestamps: false,
  }
);
