import { Omit } from '@shared/types/utilTypes';
import Student from '../infra/typeorm/entity/Student';

type CreateStudentDTO = Omit<Student, '_id' | 'type' | 'updatedAt' | 'createdAt'>;

export default CreateStudentDTO;
