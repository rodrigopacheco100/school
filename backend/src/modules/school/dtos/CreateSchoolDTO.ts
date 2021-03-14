import { Omit } from '@shared/types/utilTypes';
import School from '../infra/typeorm/entity/School';

type CreateSchoolDTO = Omit<School, '_id' | 'type' | 'updatedAt' | 'createdAt'>;

export default CreateSchoolDTO;
