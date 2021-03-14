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

  async execute({
    address,
    contact,
    cpf,
    name,
    password,
    username,
    birth,
    parents,
    confirmedAt
  }: CreateStudentDTO): Promise<Student> {
    if (cpf) {
      if (!CPF.isValid(cpf)) throw new AppError('CPF não é válido');
      const studentByCPF = this.studentRepository.findByCPF(cpf);
      if (studentByCPF) throw new AppError('CPF já está sendo utilizado');
    }

    const [studentByUsername, studentByEmail] = await Promise.all([
      this.studentRepository.findByUsername(username),
      this.studentRepository.findByEmail(contact.email)
    ]);

    if (studentByUsername) throw new AppError('Usuário já está sendo utilizado');
    if (studentByEmail) throw new AppError('E-mail já está sendo utilizado');

    const teacher = await this.studentRepository.create({
      username,
      password: await crypto.encrypt(password),
      address,
      cpf,
      name,
      contact,
      parents: parents.map(parent => ({
        name: parent.name,
        cpf: parent.cpf,
        birth: date.convertBrazilianStringDateToUTC(String(parent.birth)),
        contact: parent.contact
      })),
      birth: date.convertBrazilianStringDateToUTC(String(birth)),
      confirmedAt
    });

    return teacher;
  }
}
