/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/infra/http/error/AppError';
import Joi from 'joi';

type SchemaBuilder<T> = {
  [key in keyof T]: Joi.Schema;
};

const validateSchema = <Schema = any>(params: { body: any; schema: SchemaBuilder<Schema> }): Schema => {
  const validate = Joi.object<Schema>(params.schema).validate(params.body, {
    abortEarly: false
  });

  if (validate.error) throw new AppError(validate.error.message);

  return validate.value as Schema;
};

export { validateSchema };
