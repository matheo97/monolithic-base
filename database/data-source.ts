import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('process.env.DB_HOST', process.env.DB_HOST);
console.log('process.env.DB_PASSWORD', process.env.DB_PASSWORD);
console.log('process.env.DB_DATABASE', process.env.DB_DATABASE);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER_NAME,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_TEST_DATABASE
      : process.env.DB_DATABASE,
  logging: true,
  entities: [__dirname + '/dist/src/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
