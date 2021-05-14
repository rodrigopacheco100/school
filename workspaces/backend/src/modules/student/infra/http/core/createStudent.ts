import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import CreateStudentDTO from '@modules/student/dtos/CreateStudentDTO';
import CreateStudentService from '@modules/student/service/CreateStudentService';

import { contactJoiSchema } from '@shared/infra/typeorm/entity/Contact';
import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import { validateSchema } from '@shared/utils';
import { parentJoiSchema } from '../../typeorm/entity/Parent';

export const createStudent = async (request: Request, response: Response): Promise<Response> => {
  const result = validateSchema<CreateStudentDTO>({
    body: request.body,
    schema: {
      username: Joi.string().required(),
      password: Joi.string().min(8).max(24).required(),
      schoolId: Joi.string().hex().length(24).required(),
      contact: Joi.object(contactJoiSchema).required(),
      name: Joi.string().max(156).required(),
      birth: Joi.date().iso().less('now').required(),
      cpf: Joi.string().length(11).optional().default(null),
      parents: Joi.array().items(parentJoiSchema).min(1).required(),
      address: Joi.object(addressJoiSchema).required(),
      confirmedAt: Joi.valid(null).optional().default(null)
    }
  });

  const createStudentService = container.resolve(CreateStudentService);
  const school = await createStudentService.execute(result);

  return response.status(201).json(school);
};
