import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import Student from '@modules/student/infra/typeorm/entity/Student';

import Teacher from '@modules/teacher/infra/typeorm/entity/Teacher';
import Subject from './Subject';

@Entity('class')
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

  @ManyToMany(() => Student, student => student.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  students?: Student[];
}