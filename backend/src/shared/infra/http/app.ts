import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';

import errorHandler from '@shared/infra/http/error/handler';
import routes from '@shared/infra/http/routes/index.routes';

const app = express();
app.use(cors());
app.use(json());
app.use(routes);

app.use(errorHandler);

export default app;
