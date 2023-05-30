import {
  Model,
  DataTypes,
  type InferAttributes,
  type ForeignKey,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize';
import { sequelize } from '../utils/connectDataBase';
import { User } from './user';

export class LeaderBoard extends Model<
  InferAttributes<LeaderBoard>,
  InferCreationAttributes<LeaderBoard>
> {
  declare id: CreationOptional<number>;
  declare wins: CreationOptional<number>;
  declare losses: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare games: CreationOptional<number>;
  declare winrate: CreationOptional<number>;
}

LeaderBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    games: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    winrate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['userId'],
      },
    },
    scopes: {
      withUser: {
        attributes: ['wins', 'losses', 'winrate', 'games'],
        include: [
          {
            association: 'user',
            attributes: ['login', 'nickname', 'avatar'],
          },
        ],
      },
    },
    sequelize,
    tableName: 'leaderBoard',
    timestamps: false,
  }
);
