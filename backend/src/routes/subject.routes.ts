import { Router } from 'express';
import SubjectController from '../database/controller/Subject';

const routes = Router();

const subjectController = new SubjectController();

routes.get('', subjectController.index);
routes.get('/:id', subjectController.show);
routes.post('', subjectController.create);
routes.put('', subjectController.update);
routes.delete('', subjectController.delete);

export default routes;
