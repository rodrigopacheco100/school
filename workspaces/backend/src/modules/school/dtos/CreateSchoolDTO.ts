import { Omit } from '@shared/types/utilTypes';
import School from '../infra/typeorm/entity/School';

type CreateSchoolDTO = Omit<School, '_id' | 'type' | 'confirmedAt' | 'updatedAt' | 'createdAt'>;

export default CreateSchoolDTO;
