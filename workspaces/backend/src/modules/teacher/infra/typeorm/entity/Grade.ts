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
  finishDate: Date | null;
}

type Schema = {
  [k in keyof Grade]: Joi.Schema;
};

export const gradeJoiSchema: Schema = {
  educationalInstitution: Joi.string().required(),
  course: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(GradeType))
    .required(),
  startDate: Joi.date().iso().less('now').required(),
  finishDate: Joi.date().iso().greater(Joi.ref('startDate')).allow(null).default(null).optional()
};
