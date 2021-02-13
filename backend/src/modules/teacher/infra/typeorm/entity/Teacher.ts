import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher')
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthday: Date;
}
