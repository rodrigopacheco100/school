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
  birth: Joi.string().regex(new RegExp('[0-9]{2}[-|/]{1}[0-9]{2}[-|/]{1}[0-9]{4}')).required(),
  contact: Joi.object(contactJoiSchema).required()
};
