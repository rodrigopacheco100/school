import { Router } from 'express';

import teacherRoutes from './teacher.routes';

const routes = Router();

routes.use('/teacher', teacherRoutes);

export default routes;
