import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import { CPF, crypto } from '@shared/utils';
import Student from '../infra/typeorm/entity/Student';
import IStudentRepository from '../repository/IStudentRepository';
import CreateStudentDTO from '../dtos/CreateStudentDTO';

@injectable()
export default class CreateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository
  ) {}

  async execute({ password, ...params }: CreateStudentDTO): Promise<Student> {
    if (params.cpf) {
      if (!CPF.isValid(params.cpf)) throw new AppError('CPF is not valid');
      const studentByCPF = await this.studentRepository.findByCPF(params.cpf);
      if (studentByCPF) throw new AppError('CPF already used');
    }

    params.parents.forEach(parent => {
      if (!CPF.isValid(parent.cpf)) throw new AppError(`CPF de ${parent.name} não é válido`);
    });

    const studentByEmail = await this.studentRepository.findByEmail(params.email);

    if (studentByEmail) throw new AppError('Email already used');

    const teacher = await this.studentRepository.create({
      ...params,
      password: await crypto.encrypt(password)
    });

    return teacher;
  }
}
