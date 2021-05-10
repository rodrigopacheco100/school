import { Router } from 'express';

import invitationRoutes from './invitation.routes';

const routes = Router();

routes.use('/invitation', invitationRoutes);

export default routes;
