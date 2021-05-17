import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import CreateSchoolService from '@modules/school/service/CreateSchoolService';

import { validateSchema } from '@shared/utils';

export const createSchool = async (request: Request, response: Response): Promise<Response> => {
  const result = validateSchema<CreateSchoolDTO>({
    body: request.body,
    schema: {
      password: Joi.string().min(8).max(24).required(),
      email: Joi.string().email().required(),
      name: Joi.string().max(156).required(),
      cnpj: Joi.string().length(14).required(),
      address: Joi.object(addressJoiSchema).required()
    }
  });

  const createSchoolService = container.resolve(CreateSchoolService);
  const school = await createSchoolService.execute(result);

  return response.status(201).json(school);
};
