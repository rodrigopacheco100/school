import { Router } from 'express';

import schoolRoutes from '@modules/school/infra/http/routes/routes';
import teacherRoutes from '@modules/teacher/infra/http/routes/routes';
import studentRoutes from '@modules/student/infra/http/routes/routes';

const routes = Router();

routes.use(schoolRoutes, teacherRoutes, studentRoutes);

export default routes;
