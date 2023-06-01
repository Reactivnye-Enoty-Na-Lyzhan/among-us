import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/connectDataBase';

export class GameParam extends Model<
  InferAttributes<GameParam>,
  InferCreationAttributes<GameParam>
> {
  declare impostors: number;
  declare meetings: number;
  declare discussion: number;
  declare interval: number;
}

GameParam.init(
  {
    impostors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    meetings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    discussion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    interval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['id', 'gameId'],
      },
    },
    sequelize,
    tableName: 'gameParams',
    timestamps: false,
  }
);
