import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import AppError from '@shared/infra/http/error/AppError';
import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import CreateSchoolService from '@modules/school/service/CreateSchoolService';

import { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';

type Schema = {
  [k in keyof CreateSchoolDTO]: Joi.Schema;
};

export const createSchool = async (request: Request, response: Response): Promise<Response> => {
  const schema: Schema = {
    username: Joi.string().required(),
    password: Joi.string().min(8).max(24).required(),
    contact: Joi.object(contactJoiSchema).required(),
    name: Joi.string().max(156).required(),
    cnpj: Joi.string().length(14).required(),
    address: Joi.object(addressJoiSchema).required(),
    confirmedAt: Joi.valid(null).optional().default(null)
  };
  const validate = Joi.object(schema).validate(request.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  const createSchoolService = container.resolve(CreateSchoolService);

  const school = await createSchoolService.execute(validate.value);

  return response.status(201).json(school);
};
