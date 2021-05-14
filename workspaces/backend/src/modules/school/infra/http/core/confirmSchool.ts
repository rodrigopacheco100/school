import ConfirmSchoolDTO from '@modules/school/dtos/ConfirmSchoolDTO';
import ConfirmSchoolService from '@modules/school/service/ConfirmSchoolService';
import { validateSchema } from '@shared/utils';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';

export const confirmSchool = async (request: Request, response: Response): Promise<Response> => {
  const result = validateSchema<ConfirmSchoolDTO>({
    body: request.body,
    schema: {
      _id: Joi.string().hex().length(24).required()
    }
  });

  const confirmSchoolService = container.resolve(ConfirmSchoolService);
  const school = await confirmSchoolService.execute(result);

  return response.status(200).json(school);
};
