import Address from '@shared/infra/typeorm/entity/Address';
import Contact from '@shared/infra/typeorm/entity/Contact';
import { AccountType } from '@shared/types/enums';
import { Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn, ObjectID } from 'typeorm';

export default class Account {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column()
  type: AccountType;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  contact: Contact;

  @Column()
  address: Address;

  @Column()
  confirmedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
