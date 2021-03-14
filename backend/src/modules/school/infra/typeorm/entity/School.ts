import { Column, Entity } from 'typeorm';

import Account from '@shared/infra/typeorm/entity/Account';
import { AccountType } from '@shared/types/enums';

@Entity('Account')
export default class School extends Account {
  @Column()
  cnpj: string;

  @Column()
  type: AccountType.School;
}
