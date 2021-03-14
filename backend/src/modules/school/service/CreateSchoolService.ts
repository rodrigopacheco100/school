import AppError from '@shared/infra/http/error/AppError';
import { CNPJ } from '@shared/utils';
import { inject, injectable } from 'tsyringe';
import ISchoolRepository from '../repository/ISchoolRepository';
import School from '../infra/typeorm/entity/School';
import CreateSchoolDTO from '../dtos/CreateSchoolDTO';

@injectable()
export default class CreateSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  async execute({ address, cnpj, name, password, username, contact }: CreateSchoolDTO): Promise<School> {
    if (!CNPJ.isValid(cnpj)) throw new AppError('CNPJ não é válido');

    const [schoolByCNPJ, schoolByUsername, schoolByEmail] = await Promise.all([
      this.schoolRepository.findByCNPJ(cnpj),
      this.schoolRepository.findByUsername(username),
      this.schoolRepository.findByEmail(contact.email)
    ]);

    if (schoolByCNPJ) throw new AppError('CNPJ já está sendo utilizado');
    if (schoolByUsername) throw new AppError('Usuário já está sendo utilizado');
    if (schoolByEmail) throw new AppError('E-mail já está sendo utilizado');

    const school = await this.schoolRepository.create({
      address,
      cnpj: CNPJ.format(cnpj),
      name,
      contact,
      password,
      username
    });

    return school;
  }
}
