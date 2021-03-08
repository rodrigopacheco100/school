import { Omit } from '@shared/types/utilTypes';
import School from '../infra/typeorm/entity/School';

type CreateSchoolDTO = Omit<School, 'createdAt' | 'updatedAt'>;

export default CreateSchoolDTO;
