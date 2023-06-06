import {
  Model,
  DataTypes,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes
} from 'sequelize';
import { sequelize } from '../../utils/connectDataBase';
import { User } from '../user';

export class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare title: string;
  declare authorId: ForeignKey<User['id']>;
  declare date: CreationOptional<Date>;
  declare pinned: CreationOptional<boolean>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'posts',
  }
);

User.hasMany(Post, { as: 'posts', foreignKey: 'authorId' });
Post.belongsTo(User, { as: 'user', foreignKey: 'authorId' });
Post.hasOne(User, { as: 'author', sourceKey: 'authorId', foreignKey: 'id' });
