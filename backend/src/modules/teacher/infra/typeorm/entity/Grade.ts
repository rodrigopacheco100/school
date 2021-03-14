import { GradeType } from '@shared/types/enums';
import Joi from 'joi';
import { Column } from 'typeorm';

export default class Grade {
  @Column()
  educationalInstitution: string;

  @Column()
  course: string;

  @Column()
  type: GradeType;

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
  type: Joi.string().valid(...Object.keys(GradeType)),
  startDate: Joi.string().required(),
  finishDate: Joi.string().required()
};
