import { type Model, type InferAttributes, type InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../utils/connectDataBase';

export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  username: string,
}

export const User = sequelize.define<IUser>('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
