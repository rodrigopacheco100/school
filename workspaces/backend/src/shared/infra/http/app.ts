import 'reflect-metadata';
import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { Connection } from 'typeorm';

import connectDB from '@shared/infra/typeorm/connection';
import containers from '@shared/container';

import errorHandler from './error/handler';
import routes from './routes';

export default async (): Promise<Application> => {
  const app = express();

  let connection: Connection = null;
  if (process.env.NODE_ENV !== 'TEST') connection = await connectDB();

  containers();

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errorHandler);

  if (process.env.NODE_ENV === 'TEST' || connection) app.listen(3333, () => console.log('Server is running'));

  return app;
};
