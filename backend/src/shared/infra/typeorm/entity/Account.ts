import Address from '@shared/infra/typeorm/entity/Address';
import Contact from '@shared/infra/typeorm/entity/Contact';
import { AccountType } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import { Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export default class Account {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: AccountType;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  contact: Contact;

  @Column()
  address: Address;

  @Column()
  confirmedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
