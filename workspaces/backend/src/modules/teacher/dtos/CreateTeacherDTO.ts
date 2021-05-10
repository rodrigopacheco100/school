import { Omit } from '@shared/types/utilTypes';
import Teacher from '../infra/typeorm/entity/Teacher';

type T = Omit<Teacher, '_id' | 'type' | 'updatedAt' | 'createdAt' | 'schoolId'>;

interface CreateTeacherDTO extends T {
  schoolId: string;
}

export default CreateTeacherDTO;
