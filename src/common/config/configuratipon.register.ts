import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

const serviceConfiguration = {
  server: {
    host: process.env.SERVER_HOST ?? 'localhost',
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000,
  },
  database: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
    database: process.env.PG_DATABASE,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
  },
};

export default registerAs('config', () => serviceConfiguration);
