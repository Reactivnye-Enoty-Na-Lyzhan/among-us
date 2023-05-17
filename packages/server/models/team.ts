import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/connectDataBase';

export class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare title: string;
  declare score: number;
};

Team.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'civil',
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'teams',
  timestamps: false,
});
