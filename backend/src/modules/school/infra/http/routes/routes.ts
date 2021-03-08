import { Router } from 'express';

import subjectRoutes from './school.routes';

const routes = Router();

routes.use('/school', subjectRoutes);

export default routes;
