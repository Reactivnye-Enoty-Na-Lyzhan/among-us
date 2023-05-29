import { sequelize } from '../../utils/connectDataBase';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DataType } from 'sequelize-typescript';

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
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataType.STRING(1),
      allowNull: false,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'emojis',
  }
);
