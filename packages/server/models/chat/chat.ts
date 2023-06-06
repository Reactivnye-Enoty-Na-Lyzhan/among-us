import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type ForeignKey,
  type CreationOptional,
  type HasManyGetAssociationsMixin,
  type HasManyCreateAssociationMixin,
} from 'sequelize';
import { Game } from '../../models/game';
import { ChatMessage } from './chatMessage';
import { sequelize } from '../../utils/connectDataBase';

export class Chat extends Model<
  InferAttributes<Chat>,
  InferCreationAttributes<Chat>
> {
  declare id: CreationOptional<number>;
  declare gameId: ForeignKey<Game['id']>;
  declare getMessages: HasManyGetAssociationsMixin<ChatMessage>;
  declare createMessage: HasManyCreateAssociationMixin<ChatMessage>;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'chats',
    timestamps: false,
  }
);

Chat.hasMany(ChatMessage, {
  as: 'messages',
  sourceKey: 'id',
  foreignKey: 'chatId',
});
ChatMessage.belongsTo(Chat, {
  as: 'chat',
  targetKey: 'id',
  foreignKey: 'chatId',
});
