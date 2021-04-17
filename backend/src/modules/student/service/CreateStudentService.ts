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

  async execute(params: CreateStudentDTO): Promise<Student> {
    if (params.cpf) {
      if (!CPF.isValid(params.cpf)) throw new AppError('CPF não é válido');
      const studentByCPF = await this.studentRepository.findByCPF(params.cpf);
      if (studentByCPF) throw new AppError('CPF já está sendo utilizado');
    }

    params.parents.forEach(parent => {
      if (!CPF.isValid(parent.cpf)) throw new AppError(`CPF de ${parent.name} não é válido`);
    });

    const [studentByUsername, studentByEmail] = await Promise.all([
      this.studentRepository.findByUsername(params.username),
      this.studentRepository.findByEmail(params.contact.email)
    ]);

    if (studentByUsername) throw new AppError('Usuário já está sendo utilizado');
    if (studentByEmail) throw new AppError('E-mail já está sendo utilizado');

    const teacher = await this.studentRepository.create({
      ...params,
      password: await crypto.encrypt(params.password),
      parents: params.parents.map(({ birth, contact, cpf, name }) => ({
        name,
        cpf,
        birth: date.convertBrazilianStringDateToUTC(String(birth)),
        contact
      })),
      birth: date.convertBrazilianStringDateToUTC(String(params.birth))
    });

    return teacher;
  }
}
