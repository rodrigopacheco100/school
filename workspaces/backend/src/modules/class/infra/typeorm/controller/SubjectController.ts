import { getMongoRepository } from 'typeorm';
import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import AppError from '@shared/infra/http/error/AppError';
import Subject from '../entity/Subject';

export default class SubjectController {
  public async index(_: Request, response: Response): Promise<Response> {
    const subjectRepository = getMongoRepository(Subject);

    const subjects = await subjectRepository.find();

    return response.json(subjects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;

    const subjectRepository = getMongoRepository(Subject);

    const subject = await subjectRepository.findOne({ _id: new ObjectID(_id) });

    return response.json(subject);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body as Subject;

    const subjectRepository = getMongoRepository(Subject);

    const subject = subjectRepository.create({ name });
    await subjectRepository.save(subject);

    return response.status(201).json(subject);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { _id, name } = request.body as Subject;

    const subjectRepository = getMongoRepository(Subject);

    const subject = await subjectRepository.findOne({
      where: { _id: new ObjectID(_id) }
    });

    if (!subject) throw new AppError('Subject not found');

    if (name) subject.name = name;
    const updatedSubject = await subjectRepository.save(subject);

    return response.json(updatedSubject);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { _id } = request.body as Subject;
    const subjectRepository = getMongoRepository(Subject);

    const subject = await subjectRepository.findOne({
      where: { _id: new ObjectID(_id) }
    });

    if (!subject) throw new AppError('Subject not found');

    await subjectRepository.delete(subject);
    return response.status(200).send();
  }
}
