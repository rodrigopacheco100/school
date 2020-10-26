import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';

import routes from './routes/index.routes';

const app = express();
app.use(cors());
app.use(json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server is running');
});
