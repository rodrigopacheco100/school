import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn, ObjectID } from 'typeorm';
import Address from '@shared/infra/typeorm/entity/Address';
import Contact from '@shared/infra/typeorm/entity/Contact';

@Entity('School')
export default class School {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  contact: Contact;

  @Column()
  address: Address;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
