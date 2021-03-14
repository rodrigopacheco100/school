import Joi from 'joi';
import { Column } from 'typeorm';

export default class Grade {
  @Column()
  educationalInstitution: string;

  @Column()
  course: string;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;
}

type Schema = {
  [k in keyof Grade]: Joi.Schema;
};

export const gradeJoiSchema: Schema = {
  educationalInstitution: Joi.string().required(),
  course: Joi.string().required(),
  startDate: Joi.string().required(),
  finishDate: Joi.string().required()
};
