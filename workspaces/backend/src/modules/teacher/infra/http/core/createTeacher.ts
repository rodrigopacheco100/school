import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import AppError from '@shared/infra/http/error/AppError';
import CreateTeacherDTO from '@modules/teacher/dtos/CreateTeacherDTO';
import CreateTeacherService from '@modules/teacher/service/CreateTeacherService';

import { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';
import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import { gradeJoiSchema } from '../../typeorm/entity/Grade';

type Schema = {
  [k in keyof CreateTeacherDTO]: Joi.Schema;
};

export const createTeacher = async (request: Request, response: Response): Promise<Response> => {
  const schema: Schema = {
    username: Joi.string().required(),
    password: Joi.string().min(8).max(24).required(),
    contact: Joi.object(contactJoiSchema).required(),
    name: Joi.string().max(156).required(),
    birth: Joi.string().regex(new RegExp('[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}')).required(),
    cpf: Joi.string().length(11).required(),
    address: Joi.object(addressJoiSchema).required(),
    grades: Joi.array().items(gradeJoiSchema).required(),
    confirmedAt: Joi.valid(null).optional().default(null)
  };
  const validate = Joi.object(schema).validate(request.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  const createTeacherService = container.resolve(CreateTeacherService);

  const school = await createTeacherService.execute(request.body);

  return response.status(201).json(school);
};
