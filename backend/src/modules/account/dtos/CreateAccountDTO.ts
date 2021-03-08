import { Omit } from '@shared/types/utilTypes';
import Account from '../infra/typeorm/entity/Account';

type CreateAccountDTO = Omit<
  Account,
  '_id' | 'confirmedAt' | 'createdAt' | 'updatedAt'
>;

export default CreateAccountDTO;
