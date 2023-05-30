import {
  Model,
  DataTypes,
  type CreationOptional,
  type ForeignKey,
  type HasManyCountAssociationsMixin,
  type HasManyCreateAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManyRemoveAssociationMixin,
  type HasManySetAssociationsMixin,
  type HasOneCreateAssociationMixin,
  type InferAttributes,
  type InferCreationAttributes,
  type HasOneGetAssociationMixin,
} from 'sequelize';
import { GameParam } from './gameParam';
import { Player } from './player';
import { Team } from './team';
import { User } from './user';
import { GameQueue } from './gameQueue';
import { GameColor } from './gameColor';
import { sequelize } from '../utils/connectDataBase';
import type { GameStatus } from 'socket/game/gameSocket.types';

export class Game extends Model<
  InferAttributes<Game>,
  InferCreationAttributes<Game>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare status: GameStatus;
  declare userId: ForeignKey<User['id']>;
  declare createParam: HasOneCreateAssociationMixin<GameParam>;
  declare createPlayer: HasManyCreateAssociationMixin<Player>;
  declare removePlayer: HasManyRemoveAssociationMixin<Player, number>;
  declare countPlayers: HasManyCountAssociationsMixin;
  declare getPlayers: HasManyGetAssociationsMixin<Player>;
  declare setPlayers: HasManySetAssociationsMixin<Player, number>;
  declare setTeams: HasManySetAssociationsMixin<Team, number>;
  declare countGameQueues: HasManyCountAssociationsMixin;
  declare createGameQueue: HasManyCreateAssociationMixin<GameQueue>;
  declare getGameQueues: HasManyGetAssociationsMixin<GameQueue>;
  declare removeGameQueue: HasManyRemoveAssociationMixin<GameQueue, number>;
  declare createColor: HasOneCreateAssociationMixin<GameColor>;
  declare getParam: HasOneGetAssociationMixin<GameParam>;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'games',
    paranoid: true,
    timestamps: false,
  }
);

Game.hasMany(Player, { as: 'players', sourceKey: 'id', foreignKey: 'gameId' });
Player.belongsTo(Game, { as: 'game', targetKey: 'id', foreignKey: 'gameId' });

Game.hasOne(GameParam, { as: 'param' });
GameParam.belongsTo(Game, { as: 'param' });

Game.hasMany(Team, { as: 'teams', sourceKey: 'id', foreignKey: 'gameId' });
Team.belongsTo(Game, { as: 'game', targetKey: 'id', foreignKey: 'gameId' });

Game.hasMany(GameQueue, {
  as: 'gameQueues',
  sourceKey: 'id',
  foreignKey: 'gameId',
});
GameQueue.belongsTo(Game, {
  as: 'gameQueue',
  targetKey: 'id',
  foreignKey: 'gameId',
});

Game.hasOne(GameColor, { as: 'color', sourceKey: 'id', foreignKey: 'gameId' });
GameColor.belongsTo(Game, {
  as: 'color',
  targetKey: 'id',
  foreignKey: 'gameId',
});
