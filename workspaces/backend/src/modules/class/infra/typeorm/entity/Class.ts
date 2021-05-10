import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('Class')
export default class Class {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  subjectId: ObjectID;

  @Column()
  teacherId: ObjectID;

  @Column()
  year: number;
}
