import { Router } from 'express';

import schoolRoutes from '@modules/school/infra/http/routes/routes';
import teacherRoutes from '@modules/teacher/infra/http/routes/routes';

const routes = Router();

routes.use(schoolRoutes, teacherRoutes);

export default routes;
