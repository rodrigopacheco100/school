import { Router } from 'express';

import subjectRoutes from './subject.routes';

const routes = Router();

routes.use('/subject', subjectRoutes);

export default routes;
