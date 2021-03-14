import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import { CPF, crypto, date } from '@shared/utils';
import Teacher from '../infra/typeorm/entity/Teacher';
import ITeacherRepository from '../repository/ITeacherRepository';
import CreateTeacherDTO from '../dtos/CreateTeacherDTO';

@injectable()
export default class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository
  ) {}

  async execute({
    address,
    contact,
    cpf,
    grades,
    name,
    password,
    username,
    birth
  }: CreateTeacherDTO): Promise<Teacher> {
    if (!CPF.isValid(cpf)) throw new AppError('CNPJ não é válido');

    const [teacherByCPF, teacherByUsername, teacherByEmail] = await Promise.all([
      this.teacherRepository.findByCPF(cpf),
      this.teacherRepository.findByUsername(username),
      this.teacherRepository.findByEmail(contact.email)
    ]);

    if (teacherByCPF) throw new AppError('CPF já está sendo utilizado');
    if (teacherByUsername) throw new AppError('Usuário já está sendo utilizado');
    if (teacherByEmail) throw new AppError('E-mail já está sendo utilizado');

    const teacher = await this.teacherRepository.create({
      username,
      password: await crypto.encrypt(password),
      address,
      cpf,
      name,
      contact,
      grades,
      birth: date.convertBrazilianStringDateToUTC(String(birth))
    });

    return teacher;
  }
}
