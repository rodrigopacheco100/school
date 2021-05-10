import Account from '@shared/infra/typeorm/entity/Account';
import { AccountType } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';
import Parent from './Parent';

@Entity('Student')
export default class Student extends Account {
  @Column()
  schoolId: ObjectID;

  @Column()
  birth: Date;

  @Column()
  cpf: string | null;

  @Column()
  parents: Parent[];

  @Column()
  type: AccountType.Student;
}
