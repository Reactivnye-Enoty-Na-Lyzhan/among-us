import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import { CreationOptional, DataTypes, ForeignKey, Model } from 'sequelize';
import { sequelize } from '../../utils/connectDataBase';
import { User } from '../user';
import { Post } from './post';

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare authorId: ForeignKey<User['id']>;
  declare postId: ForeignKey<Post['id']>;
  declare date: CreationOptional<Date>;
  declare parentId: CreationOptional<number>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'messages',
  }
);

Message.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Post.hasMany(Message, { foreignKey: 'postId', as: 'messages' });

Message.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Message, { foreignKey: 'authorId', as: 'messages' });
