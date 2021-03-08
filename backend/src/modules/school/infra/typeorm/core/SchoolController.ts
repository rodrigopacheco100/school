import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { getMongoRepository } from 'typeorm';
import * as Joi from 'joi';
import AppError from '@shared/infra/http/error/AppError';
import School from '../entity/School';

export default class SchoolController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;
    const schoolRepository = getMongoRepository(School);

    const school = await schoolRepository.findOne({ _id: new ObjectID(_id) });

    return response.json(school);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { _id, name, cnpj, address } = request.body;
    const schoolRepository = getMongoRepository(School);

    const school = await schoolRepository.findOne({
      where: { _id: new ObjectID(_id) }
    });

    if (!school) throw new AppError('School not found');

    const updatedSchool = await schoolRepository.save(school);

    return response.json(updatedSchool);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { _id } = request.body;
    const schoolRepository = getMongoRepository(School);

    const school = await schoolRepository.findOne({
      where: { _id: new ObjectID(_id) }
    });

    if (!School) throw new AppError('School not found');

    await schoolRepository.delete(school);
    return response.status(200).send();
  }
}
