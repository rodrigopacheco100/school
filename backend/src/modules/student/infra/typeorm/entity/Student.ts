import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Class from '@modules/class/infra/typeorm/entity/Class';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  @ManyToMany(() => Class, class1 => class1.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  classes?: Class[];
}
