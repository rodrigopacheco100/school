import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birth: Date;
}
