import { AccountType } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('Invitation')
export default class Invitation {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  schoolId: ObjectID;

  @Column()
  targetId: ObjectID;

  @Column()
  targetType: AccountType.Student | AccountType.Teacher;

  @Column()
  acceptedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
