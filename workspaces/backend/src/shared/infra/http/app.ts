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

  if (process.env.NODE_ENV !== 'TEST') await connectDB();

  containers();

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errorHandler);

  return app;
};
