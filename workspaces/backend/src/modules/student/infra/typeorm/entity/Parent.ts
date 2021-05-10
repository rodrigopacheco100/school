import Contact, { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';
import Joi from 'joi';
import { Column } from 'typeorm';

export default class Parent {
  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birth: Date;

  @Column()
  contact: Contact;
}

type Schema = {
  [k in keyof Parent]: Joi.Schema;
};

export const parentJoiSchema: Schema = {
  name: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  birth: Joi.date().iso().less('now').required(),
  contact: Joi.object(contactJoiSchema).required()
};
