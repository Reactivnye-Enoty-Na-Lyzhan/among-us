import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type ForeignKey,
  type CreationOptional,
} from 'sequelize';
import { Chat } from './chat';
import { User } from '../user';
import { Player } from '../../models/player';
import { sequelize } from '../../utils/connectDataBase';

export class ChatMessage extends Model<
  InferAttributes<ChatMessage>,
  InferCreationAttributes<ChatMessage
  >> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare chatId: ForeignKey<Chat['id']>;
  declare authorId: ForeignKey<User['id']>;
}

ChatMessage.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'chatMessages',
  timestamps: false,
});

Player.hasMany(ChatMessage, {
  as: 'messages',
  sourceKey: 'id',
  foreignKey: 'authorId',
});
ChatMessage.belongsTo(Player, {
  as: 'author',
  targetKey: 'id',
  foreignKey: 'authorId',
});

