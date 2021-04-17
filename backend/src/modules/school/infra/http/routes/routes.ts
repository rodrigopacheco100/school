import { Router } from 'express';

import schoolRoutes from './school.routes';

const routes = Router();

routes.use('/school', schoolRoutes);

export default routes;
