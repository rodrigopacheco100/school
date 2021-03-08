import { Router } from 'express';
import SubjectController from '@modules/class/infra/typeorm/controller/SubjectController';

const routes = Router();

const subjectController = new SubjectController();

routes.get('', subjectController.index);
routes.get('/:_id', subjectController.show);
routes.post('', subjectController.create);
routes.put('', subjectController.update);
routes.delete('', subjectController.delete);

export default routes;
