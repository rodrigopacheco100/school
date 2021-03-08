import { Router } from 'express';

import schoolRoutes from '@modules/school/infra/http/routes/routes';
import classRoutes from '@modules/class/infra/http/routes/routes';

const routes = Router();

routes.use(schoolRoutes, classRoutes);

export default routes;
