import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

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
