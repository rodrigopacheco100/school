import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import AppError from '@shared/infra/http/error/AppError';
import CreateStudentDTO from '@modules/student/dtos/CreateStudentDTO';
import CreateStudentService from '@modules/student/service/CreateStudentService';

import { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';
import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import { parentJoiSchema } from '../../typeorm/entity/Parent';

type Schema = {
  [k in keyof CreateStudentDTO]: Joi.Schema;
};

export const createStudent = async (request: Request, response: Response): Promise<Response> => {
  const schema: Schema = {
    username: Joi.string().required(),
    password: Joi.string().min(8).max(24).required(),
    contact: Joi.object(contactJoiSchema).required(),
    name: Joi.string().max(156).required(),
    birth: Joi.string().regex(new RegExp('[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}')).required(),
    cpf: Joi.string().length(11).optional().default(null),
    parents: Joi.array().items(parentJoiSchema).min(1).required(),
    address: Joi.object(addressJoiSchema).required(),
    confirmedAt: Joi.valid(null).optional().default(null)
  };
  const validate = Joi.object<CreateStudentDTO>(schema).validate(request.body, {
    abortEarly: false
  });
  if (validate.error) throw new AppError(validate.error.message);

  const createStudentService = container.resolve(CreateStudentService);
  const school = await createStudentService.execute(validate.value);

  return response.status(201).json(school);
};
