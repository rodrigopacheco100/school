import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import { CPF, crypto } from '@shared/utils';
import Teacher from '../infra/typeorm/entity/Teacher';
import ITeacherRepository from '../repository/ITeacherRepository';
import CreateTeacherDTO from '../dtos/CreateTeacherDTO';

@injectable()
export default class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository
  ) {}

  async execute({ password, ...params }: CreateTeacherDTO): Promise<Teacher> {
    if (!CPF.isValid(params.cpf)) throw new AppError('CPF is not valid');

    const [teacherByCPF, teacherByEmail] = await Promise.all([
      this.teacherRepository.findByCPF(params.cpf),
      this.teacherRepository.findByEmail(params.email)
    ]);

    if (teacherByCPF) throw new AppError('CPF already used');
    if (teacherByEmail) throw new AppError('Email already used');

    const teacher = await this.teacherRepository.create({
      ...params,
      password: await crypto.encrypt(password)
    });

    return teacher;
  }
}
