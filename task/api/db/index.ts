import { Sequelize, Dialect } from 'sequelize';

const dbDatabase = process.env.DB_DATABASE as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT as Dialect;
const dbPort: number = parseInt(process.env.DB_PORT as string);
const dbPassword = process.env.DB_PASSWORD;

const db = new Sequelize(dbDatabase, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect
});

db.sync();

export default db;