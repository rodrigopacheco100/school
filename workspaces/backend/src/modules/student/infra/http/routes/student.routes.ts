import { Router } from 'express';
import { createStudent } from '../core';

const routes = Router();

routes.post('/createStudent', createStudent);

export default routes;
