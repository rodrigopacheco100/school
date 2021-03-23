import ConfirmSchoolService from '@modules/school/service/ConfirmSchoolService';
import AppError from '@shared/infra/http/error/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export const confirmSchool = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;

  if (!id) throw new AppError('ID não foi informado.');

  const confirmSchoolService = container.resolve(ConfirmSchoolService);

  const school = await confirmSchoolService.execute(String(id));

  return response.status(200).json(school);
};
