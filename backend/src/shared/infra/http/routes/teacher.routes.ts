import { Router } from 'express';
import TeacherController from '../database/controller/Teacher';

const routes = Router();

const teacherController = new TeacherController();

routes.get('', teacherController.index);
routes.get('/:id', teacherController.show);
routes.post('', teacherController.create);
routes.put('', teacherController.update);
routes.delete('', teacherController.delete);

export default routes;
