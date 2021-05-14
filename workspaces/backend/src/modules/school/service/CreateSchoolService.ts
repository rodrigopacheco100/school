import AppError from '@shared/infra/http/error/AppError';
import { CNPJ, crypto } from '@shared/utils';
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

  async execute({ password, ...params }: CreateSchoolDTO): Promise<School> {
    if (!CNPJ.isValid(params.cnpj)) throw new AppError('CNPJ is not valid');

    const [schoolByCNPJ, schoolByUsername, schoolByEmail] = await Promise.all([
      this.schoolRepository.findByCNPJ(params.cnpj),
      this.schoolRepository.findByUsername(params.username),
      this.schoolRepository.findByEmail(params.contact.email)
    ]);

    if (schoolByCNPJ) throw new AppError('CNPJ already used');
    if (schoolByUsername) throw new AppError('Username already used');
    if (schoolByEmail) throw new AppError('Email already used');

    const school = await this.schoolRepository.create({
      ...params,
      password: await crypto.encrypt(password)
    });

    return school;
  }
}
