import { Omit } from '@shared/types/utilTypes';
import Student from '../infra/typeorm/entity/Student';

type T = Omit<Student, '_id' | 'type' | 'schoolId' | 'confirmedAt' | 'updatedAt' | 'createdAt'>;

interface CreateStudentDTO extends T {
  schoolId: string;
}

export default CreateStudentDTO;
