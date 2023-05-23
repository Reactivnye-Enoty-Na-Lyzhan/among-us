import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type BelongsToManyAddAssociationMixin,
} from 'sequelize';
import { compare } from 'bcrypt';
import { Player } from './player';
import { Game } from './game';
import { GameQueue } from './gameQueue';
import { WrongDataError } from '../utils/errors/commonErrors/WrongDataError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { sequelize } from '../utils/connectDataBase';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare username: string;
  declare firstName: string;
  declare lastName: string;
  declare nickname: CreationOptional<string>;
  declare phone: string | null;
  declare email: string;
  declare password: string | null;
  declare avatar: CreationOptional<string>;
  declare id: CreationOptional<number>;
  declare yandexId: CreationOptional<number>;
  declare accessToken: CreationOptional<string>;
  declare refreshToken: CreationOptional<string>;
  declare addGame: BelongsToManyAddAssociationMixin<Game, number>;

  // Метод проверки данных пользователя
  static async findByCredentials(
    username: string,
    password: string
  ): Promise<User | unknown> {
    try {
      const user = await this.scope('withPassword').findOne({
        where: {
          username,
        },
      });

      if (!user || !user.password) {
        return Promise.reject(
          new WrongDataError(ErrorMessages.wrongPasswordOrUsername)
        );
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        return Promise.reject(
          new NotAuthorizedError(ErrorMessages.wrongPasswordOrUsername)
        );
      }

      return user;
    } catch (err: unknown) {
      return err;
    }
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    yandexId: {
      type: DataTypes.INTEGER,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password', 'accessToken', 'refreshToken'],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password'],
        },
      },
      withRefreshToken: {
        attributes: {
          include: ['refreshToken'],
        },
      },
      withTokens: {
        attributes: {
          include: ['accessToken', 'refreshToken'],
        },
      },
    },
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

User.hasMany(Player, { as: 'users', sourceKey: 'id', foreignKey: 'userId' });
Player.belongsTo(User, { as: 'user', targetKey: 'id', foreignKey: 'userId' });

User.hasMany(GameQueue, {
  as: 'userQueues',
  sourceKey: 'id',
  foreignKey: 'userId',
});
GameQueue.belongsTo(User, {
  as: 'userQueue',
  targetKey: 'id',
  foreignKey: 'userId',
});
