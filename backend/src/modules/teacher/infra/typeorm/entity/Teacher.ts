import Account from '@shared/infra/typeorm/entity/Account';
import { AccountType } from '@shared/types/enums';
import { Column, Entity } from 'typeorm';

@Entity('Account')
export default class Teacher extends Account {
  @Column()
  birth: Date;

  @Column()
  cpf: string;

  @Column()
  type: AccountType.Teacher;

  @Column()
  grades: string[];
}
