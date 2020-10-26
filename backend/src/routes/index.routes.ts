import { Router } from 'express';

import subjectRoutes from './subject.routes';
import teacherRoutes from './teacher.routes';

const routes = Router();

routes.use('/subject', subjectRoutes);
routes.use('/teacher', teacherRoutes);

export default routes;
