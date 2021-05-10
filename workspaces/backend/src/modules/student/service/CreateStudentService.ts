import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import { CPF, crypto, date } from '@shared/utils';
import Student from '../infra/typeorm/entity/Student';
import IStudentRepository from '../repository/IStudentRepository';
import CreateStudentDTO from '../dtos/CreateStudentDTO';

@injectable()
export default class CreateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository
  ) {}

  async execute({ password, parents, birth, ...params }: CreateStudentDTO): Promise<Student> {
    if (params.cpf) {
      if (!CPF.isValid(params.cpf)) throw new AppError('CPF is not valid');
      const studentByCPF = await this.studentRepository.findByCPF(params.cpf);
      if (studentByCPF) throw new AppError('CPF already used');
    }

    parents.forEach(parent => {
      if (!CPF.isValid(parent.cpf)) throw new AppError(`CPF de ${parent.name} não é válido`);
    });

    const [studentByUsername, studentByEmail] = await Promise.all([
      this.studentRepository.findByUsername(params.username),
      this.studentRepository.findByEmail(params.contact.email)
    ]);

    if (studentByUsername) throw new AppError('Username already used');
    if (studentByEmail) throw new AppError('Email already used');

    const teacher = await this.studentRepository.create({
      ...params,

      password: await crypto.encrypt(password),
      parents: parents.map(({ birth, contact, cpf, name }) => ({
        name,
        cpf,
        birth: date.convertBrazilianStringDateToUTC(String(birth)),
        contact
      })),
      birth: date.convertBrazilianStringDateToUTC(String(birth))
    });

    return teacher;
  }
}
