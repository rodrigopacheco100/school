import ConfirmSchoolDTO from '@modules/school/dtos/ConfirmSchoolDTO';
import ConfirmSchoolService from '@modules/school/service/ConfirmSchoolService';
import AppError from '@shared/infra/http/error/AppError';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';

type Schema = {
  [k in keyof ConfirmSchoolDTO]: Joi.Schema;
};

export const confirmSchool = async (request: Request, response: Response): Promise<Response> => {
  const schema: Schema = {
    _id: Joi.string().hex().length(24).required()
  };
  const validate = Joi.object(schema).validate(request.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  const confirmSchoolService = container.resolve(ConfirmSchoolService);

  const school = await confirmSchoolService.execute(validate.value);

  return response.status(200).json(school);
};
