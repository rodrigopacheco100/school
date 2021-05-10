import { Omit } from '@shared/types/utilTypes';
import Teacher from '../infra/typeorm/entity/Teacher';

type CreateTeacherDTO = Omit<Teacher, '_id' | 'type' | 'updatedAt' | 'createdAt'>;

export default CreateTeacherDTO;
