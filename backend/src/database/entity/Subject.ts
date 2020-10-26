import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Subject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
