import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type ForeignKey,
  type CreationOptional,
} from 'sequelize';
import { Game } from './game';
import { sequelize } from '../utils/connectDataBase';
import type { GameRole } from '../types/socket/game/gameSocket.types';

export class Team extends Model<
  InferAttributes<Team>,
  InferCreationAttributes<Team>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare role: GameRole;
  declare score: number;
  declare gameId: ForeignKey<Game['id']>;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'civil',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'teams',
    timestamps: false,
  }
);
