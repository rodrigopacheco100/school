import { State } from '@shared/types/enums';
import Joi from 'joi';
import { Column } from 'typeorm';

export default class Address {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  cep: string;

  @Column()
  complement?: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: State;
}

type Schema = {
  [k in keyof Address]: Joi.Schema;
};

export const addressJoiSchema: Schema = {
  street: Joi.string().required(),
  number: Joi.number().required(),
  complement: Joi.string().optional(),
  city: Joi.string().required(),
  neighborhood: Joi.string().required(),
  cep: Joi.string().length(9).regex(new RegExp('[0-9]{5}[-]{1}[0-9]{3}')),
  state: Joi.string()
    .valid(...Object.values(State))
    .required()
};
