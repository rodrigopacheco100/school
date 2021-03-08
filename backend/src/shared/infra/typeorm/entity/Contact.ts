import Joi from 'joi';
import { Column } from 'typeorm';

export default class Contact {
  @Column()
  email: string;

  @Column()
  phones?: Array<string>;
}

type Schema = {
  [k in keyof Contact]: Joi.Schema;
};

export const contactJoiSchema: Schema = {
  email: Joi.string().email().required(),
  phones: Joi.array().optional()
};
