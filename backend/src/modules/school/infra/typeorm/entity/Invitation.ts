import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('Invitation')
export default class Invitation {
  @ObjectIdColumn()
  _id: ObjectID;
}
