import { ObjectID } from 'mongodb';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity('Invitation')
export default class Invitation {
  @ObjectIdColumn()
  _id: ObjectID;
}
