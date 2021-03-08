import { Omit } from '@shared/types/utilTypes';
import Account from '../infra/typeorm/entity/Account';

type UpdateAccountDTO = Partial<
  Omit<Account, '_id' | 'createdAt' | 'updatedAt' | 'type'>
>;

export default UpdateAccountDTO;
