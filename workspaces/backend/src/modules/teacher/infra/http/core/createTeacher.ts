import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import CreateTeacherDTO from '@modules/teacher/dtos/CreateTeacherDTO';
import CreateTeacherService from '@modules/teacher/service/CreateTeacherService';

import { addressJoiSchema } from '@shared/infra/typeorm/entity/Address';
import { validateSchema } from '@shared/utils';
import { gradeJoiSchema } from '../../typeorm/entity/Grade';

export const createTeacher = async (request: Request, response: Response): Promise<Response> => {
  const result = validateSchema<CreateTeacherDTO>({
    body: request.body,
    schema: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(24).required(),
      schoolId: Joi.string().hex().length(24).required(),
      name: Joi.string().max(156).required(),
      birth: Joi.date().iso().less('now').required(),
      cpf: Joi.string().length(11).required(),
      address: Joi.object(addressJoiSchema).required(),
      grades: Joi.array().items(gradeJoiSchema).required()
    }
  });

  const createTeacherService = container.resolve(CreateTeacherService);
  const school = await createTeacherService.execute(result);

  return response.status(201).json(school);
};
