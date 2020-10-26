import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Class from './Class';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  birth: Date;

  @ManyToMany(() => Class, class1 => class1.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  classes?: Class[];
}
