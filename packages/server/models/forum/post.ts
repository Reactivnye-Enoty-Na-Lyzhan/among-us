import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../utils/connectDataBase';
import { User } from '../user';

export class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare authorId: ForeignKey<User['id']>;
  declare date: Date;
  declare pinned: CreationOptional<boolean>;
  declare getAuthor: () => Promise<User | null>;
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
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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

User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Post.prototype.getAuthor = function () {
  return User.findByPk(this.authorId);
};
