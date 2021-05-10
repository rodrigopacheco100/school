import { Router } from 'express';
import { createTeacher } from '../core';

const routes = Router();

routes.post('/createTeacher', createTeacher);

export default routes;
