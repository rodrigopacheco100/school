import 'reflect-metadata';
import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';

import connectDB from '@shared/infra/typeorm/connection';
import containers from '@shared/container';

import errorHandler from './error/handler';
import routes from './routes';

export default async (): Promise<Application> => {
  const app = express();

  await connectDB();

  containers();

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errorHandler);

  return app;
};
