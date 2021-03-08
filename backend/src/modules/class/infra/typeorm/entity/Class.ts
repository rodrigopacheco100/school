import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ObjectIdColumn,
  OneToOne,
  ObjectID
} from 'typeorm';

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
