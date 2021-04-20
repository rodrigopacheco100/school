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

  async execute({ grades, password, birth, ...params }: CreateTeacherDTO): Promise<Teacher> {
    if (!CPF.isValid(params.cpf)) throw new AppError('CPF não é válido');

    const [teacherByCPF, teacherByUsername, teacherByEmail] = await Promise.all([
      this.teacherRepository.findByCPF(params.cpf),
      this.teacherRepository.findByUsername(params.username),
      this.teacherRepository.findByEmail(params.contact.email)
    ]);

    if (teacherByCPF) throw new AppError('CPF já está sendo utilizado');
    if (teacherByUsername) throw new AppError('Usuário já está sendo utilizado');
    if (teacherByEmail) throw new AppError('E-mail já está sendo utilizado');

    const teacher = await this.teacherRepository.create({
      ...params,
      password: await crypto.encrypt(password),
      grades: grades.map(({ course, educationalInstitution, type, finishDate, startDate }) => {
        return {
          educationalInstitution,
          course,
          type,
          startDate: date.convertBrazilianStringDateToUTC(String(startDate)),
          finishDate: date.convertBrazilianStringDateToUTC(String(finishDate))
        };
      }),
      birth: date.convertBrazilianStringDateToUTC(String(birth))
    });

    return teacher;
  }
}
