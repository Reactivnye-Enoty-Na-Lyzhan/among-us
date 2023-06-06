import {
  Model,
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../utils/connectDataBase';

export class Emoji extends Model<
  InferAttributes<Emoji>,
  InferCreationAttributes<Emoji>
> {
  declare id: CreationOptional<number>;
  declare symbol: string;
  declare name: string;
}

Emoji.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'emojis',
  }
);
