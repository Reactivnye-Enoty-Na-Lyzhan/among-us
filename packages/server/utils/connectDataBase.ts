import { createNamespace } from 'cls-hooked';
import dotenv from 'dotenv';
import path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const nameSpace = createNamespace('sequilize-cls');
(Sequelize as any).__proto__.useCLS(nameSpace);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  logging: false,
};
export const sequelize = new Sequelize(sequelizeOptions);

export const connectDataBase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (err: unknown) {
    console.error('Ошибка при подключении к Базе данных');
    console.log(err);
  }
};
