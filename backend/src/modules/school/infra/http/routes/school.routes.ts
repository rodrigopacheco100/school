import { Router } from 'express';
import { createSchool } from '../core';

const routes = Router();

routes.post('/createSchool', createSchool);

export default routes;
