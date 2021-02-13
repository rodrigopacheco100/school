import { State } from '@shared/enums';
import { Column } from 'typeorm';

export default class Address {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement?: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: State;
}
