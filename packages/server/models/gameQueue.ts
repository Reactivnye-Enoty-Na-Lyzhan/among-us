import {
  Model,
  DataTypes,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { Game } from './game';
import { User } from './user';
import { sequelize } from '../utils/connectDataBase';

export class GameQueue extends Model<
  InferAttributes<GameQueue>,
  InferCreationAttributes<GameQueue>
> {
  declare id: CreationOptional<number>;
  declare gameId: ForeignKey<Game['id']>;
  declare userId: ForeignKey<User['id']>;
}

GameQueue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'gameQueues',
    timestamps: false,
  }
);
