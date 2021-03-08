import { Router } from 'express';
import { createSchool } from '../../typeorm/core';

const routes = Router();

routes.post('/createSchool', createSchool);

export default routes;
