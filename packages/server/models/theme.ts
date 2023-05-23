import {
    Model,
    DataTypes,
    type CreationOptional,
    type ForeignKey,
    type InferAttributes,
    type InferCreationAttributes,
  } from 'sequelize';
import { sequelize } from '../utils/connectDataBase';
import { User } from './user';

export class UserTheme extends Model<
InferAttributes<UserTheme>,
InferCreationAttributes<UserTheme>
> {
    declare id: CreationOptional<number>;
    declare theme: number;
    declare userId: ForeignKey<User['id']>;
}

UserTheme.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    theme: {
      //all themes are to be assigned a number on client
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'themes',
    timestamps: false,
  }
);
User.hasOne(UserTheme, {foreignKey: 'userId' });
UserTheme.belongsTo(User, {foreignKey: 'userId' });
