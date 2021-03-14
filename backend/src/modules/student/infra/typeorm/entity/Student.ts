import Account from '@shared/infra/typeorm/entity/Account';
import { AccountType } from '@shared/types/enums';
import { Column, Entity } from 'typeorm';

@Entity('Account')
export default class Student extends Account {
  @Column()
  birth: Date;

  @Column()
  cpf: string | null;

  @Column()
  type: AccountType.Student;
}
