import { Router } from 'express';

import studentRoutes from './student.routes';

const routes = Router();

routes.use('/student', studentRoutes);

export default routes;
