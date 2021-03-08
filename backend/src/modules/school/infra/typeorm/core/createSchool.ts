import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import AppError from '@shared/infra/http/error/AppError';
import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import CreateSchoolService from '@modules/school/service/CreateSchoolService';
import { AccountType } from '@shared/types/enums';
import { Omit } from '@shared/types/utilTypes';

import CreateAccountDTO from '@modules/account/dtos/CreateAccountDTO';
import { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';

export interface CreateSchoolBody
  extends Omit<CreateSchoolDTO, '_id'>,
    CreateAccountDTO {}

type Schema = {
  [k in keyof CreateSchoolBody]: Joi.Schema;
};

const schema: Schema = {
  username: Joi.string().required(),
  password: Joi.string().min(8).max(24).required(),
  contact: Joi.object(contactJoiSchema).required(),
  type: Joi.string()
    .valid(...Object.values(AccountType))
    .required(),
  name: Joi.string().max(156).required(),
  cnpj: Joi.string().length(14).required(),
  address: Joi.object(addressJoiSchema).required()
};

export const createSchool = async (
  request: Request<null, null, CreateSchoolBody>,
  response: Response
): Promise<Response> => {
  const validate = Joi.object(schema).validate(request.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  const createSchoolService = container.resolve(CreateSchoolService);

  const school = await createSchoolService.execute(request.body);

  return response.status(201).json(school);
};
