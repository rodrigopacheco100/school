import { Router } from 'express';
import { confirmSchool, createSchool } from '../core';

const routes = Router();

routes.post('/createSchool', createSchool);
routes.put('/confirmSchool', confirmSchool);

export default routes;
