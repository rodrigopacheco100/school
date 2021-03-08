import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('Subject')
export default class Subject {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;
}
