import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Subject from '../entity/Subject';

export default class SubjectController {
  public async index(_: Request, response: Response): Promise<Response> {
    const subjectRepository = getRepository(Subject);

    const subjects = await subjectRepository.find();

    return response.json(subjects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const subjectRepository = getRepository(Subject);

    const subject = await subjectRepository.findOne({ id: Number(id) });

    return response.json(subject);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const subjectRepository = getRepository(Subject);

    const { name } = request.body;

    const subject = subjectRepository.create({ name });
    await subjectRepository.save(subject);

    return response.status(201).json(subject);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const subjectRepository = getRepository(Subject);

    const { id, name } = request.body;

    const subject = await subjectRepository.findOne({ id });
    subject.name = name;
    const updatedSubject = await subjectRepository.save(subject);

    return response.json(updatedSubject);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const subjectRepository = getRepository(Subject);

    const { id } = request.body;

    const subject = await subjectRepository.findOne({ id });

    await subjectRepository.delete(subject);

    return response.status(200).send();
  }
}
