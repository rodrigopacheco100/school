import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Joi from 'joi';

import AppError from '@shared/infra/http/error/AppError';
import CreateInvitationDTO from '@modules/invitation/dtos/CreateInvitationDTO';
import { AccountType } from '@shared/types/enums';
import CreateInvitationService from '@modules/invitation/service/createInvitationService';

type Schema = {
  [k in keyof CreateInvitationDTO]: Joi.Schema;
};

export const createInvitation = async (request: Request, response: Response): Promise<Response> => {
  const schema: Schema = {
    schoolId: Joi.string().hex().required(),
    targetType: Joi.string().valid(AccountType.Student, AccountType.Teacher),
    targetId: Joi.string().hex().required()
  };
  const validate = Joi.object(schema).validate(request.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  const createInvitationService = container.resolve(CreateInvitationService);

  const invitation = await createInvitationService.execute(validate.value);

  return response.status(201).json(invitation);
};
