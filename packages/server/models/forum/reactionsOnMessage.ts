import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { User } from '../../models/user';
import { sequelize } from '../../utils/connectDataBase';
import { Message } from './message';

export class ReactionsOnMessage extends Model<
  InferAttributes<ReactionsOnMessage>,
  InferCreationAttributes<ReactionsOnMessage>
> {
  declare message_id: number;
  declare user_id: number;
  declare reactions: Record<string, boolean>;
}

const inNotNegativeInteger = (value: number) =>
  Number.isInteger(value) && value >= 0;

const isCorrectReactionsJSON = (reactionsJSON: Record<string, unknown>) => {
  return Object.entries(reactionsJSON).every(([_, isReactionPutFlag]) => {
    return typeof isReactionPutFlag === 'boolean';
  });
};

ReactionsOnMessage.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        inNotNegativeInteger,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: { inNotNegativeInteger },
    },
    reactions: {
      type: DataTypes.JSONB,
      defaultValue: {},
      validate: { isCorrectReactionsJSON },
    },
  },
  {
    sequelize: sequelize,
    tableName: 'reactions_on_messages',
  }
);

Message.hasOne(ReactionsOnMessage, {
  sourceKey: 'id',
  foreignKey: 'message_id',
  onDelete: 'CASCADE',
  as: 'reactions',
});
ReactionsOnMessage.belongsTo(Message, {
  targetKey: 'id',
  foreignKey: 'message_id',
  as: 'message',
});

User.hasOne(ReactionsOnMessage, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'onReactionsOnMessage',
});
ReactionsOnMessage.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'user',
});
