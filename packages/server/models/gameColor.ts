import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  ForeignKey,
  CreationOptional,
} from 'sequelize';
import { Game } from './game';
import { sequelize } from '../utils/connectDataBase';
import { SuitColorsType } from 'socket/game/gameSocket.types';

export class GameColor extends Model<InferAttributes<GameColor>, InferCreationAttributes<GameColor>> {
  declare id: CreationOptional<number>;
  declare gameId: ForeignKey<Game['id']>;
  declare colors: SuitColorsType;
};

GameColor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  colors: {
    type: DataTypes.JSONB,
  }
}, {
  sequelize,
  tableName: 'gameColors',
  timestamps: false,
});
