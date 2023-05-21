import { Model, DataTypes, Deferrable, ForeignKey, CreationOptional } from 'sequelize';
import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../utils/connectDataBase';
import { Post } from './post';
import { User } from '../user';


export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message, { omit: 'id' }>> {
  declare id?: number;
  declare text: string;
  declare authorId: ForeignKey<User['id']>;
  declare login: string;
  declare postId: ForeignKey<Post['id']>;
  declare date: Date;
  declare parentId?: CreationOptional<number>;
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
        deferrable: Deferrable.NOT(),
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
