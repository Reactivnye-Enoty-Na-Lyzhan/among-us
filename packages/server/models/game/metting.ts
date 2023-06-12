import {
  Model,
  DataTypes,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { Game } from './game';
import { sequelize } from '../../utils/connectDataBase';
import type { MeetingResults, MeetingVotedList } from 'socket/game/gameSocket.types';

export class Meeting extends Model<
  InferAttributes<Meeting>,
  InferCreationAttributes<Meeting>
> {
  declare id: CreationOptional<number>;
  declare lastMeeting: CreationOptional<Date>;
  declare meetingCount: CreationOptional<number>;
  declare isProccessing: CreationOptional<boolean>;
  declare votedList: MeetingVotedList;
  declare results: CreationOptional<MeetingResults>;
  declare gameId: ForeignKey<Game['id']>;
}

Meeting.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lastMeeting: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  meetingCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isProccessing: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  votedList: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  results: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
}, {
  sequelize,
  tableName: 'meetings',
  timestamps: false,
});
