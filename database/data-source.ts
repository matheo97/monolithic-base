import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const sourcePath = __dirname.split('/');
sourcePath.pop();
const entitiesSource = sourcePath.join('/');

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
  entities: [entitiesSource + '/src/entities/*.entity.ts'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
