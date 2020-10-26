import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birth: Date;
}
