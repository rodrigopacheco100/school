import { Router } from 'express';
import { createInvitation } from '../core';

const routes = Router();

routes.post('/createInvitation', createInvitation);

export default routes;
