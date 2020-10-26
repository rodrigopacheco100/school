import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import Subject from './Subject';
import Teacher from './Teacher';

@Entity()
export default class Class {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Subject)
  @JoinColumn()
  subject: Subject;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @Column()
  year: number;
}
