import AppError from '@shared/infra/http/error/AppError';
import { validateBr } from 'js-brasil';
import { container, inject, injectable } from 'tsyringe';
import CreateAccountService from '@modules/account/services/CreateAccountService';
import School from '../infra/typeorm/entity/School';
import ISchoolRepository from '../repository/ISchoolRepository';
import { CreateSchoolBody } from '../infra/typeorm/core';

@injectable()
export default class CreateSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  async execute({
    address,
    cnpj,
    name,
    password,
    type,
    username,
    contact
  }: CreateSchoolBody): Promise<School> {
    if (!validateBr.cnpj(cnpj)) throw new AppError('CNPJ não é válido');

    console.log(contact.email);
    const [schoolByEmail, schoolByCNPJ] = await Promise.all([
      this.schoolRepository.findByEmail(contact.email),
      this.schoolRepository.findByCNPJ(cnpj)
    ]);
    if (schoolByEmail) throw new AppError('Email já está sendo utilizado');
    if (schoolByCNPJ) throw new AppError('CNPJ já está sendo utilizado');

    const createAccountService = container.resolve(CreateAccountService);
    const account = await createAccountService.execute({
      username,
      password,
      type
    });

    const school = await this.schoolRepository.create({
      _id: account._id,
      address,
      cnpj,
      name,
      contact
    });

    return school;
  }
}
