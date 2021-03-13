import AppError from '@shared/infra/http/error/AppError';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { inject, injectable } from 'tsyringe';
import CreateAccountService from '@modules/account/service/CreateAccountService';
import IAccountRepository from '@modules/account/repository/IAccountRepository';
import { AccountType } from '@shared/types/enums';
import Account from '@modules/account/infra/typeorm/entity/Account';
import School from '../infra/typeorm/entity/School';
import ISchoolRepository from '../repository/ISchoolRepository';
import { CreateSchoolBody } from '../infra/http/core';

@injectable()
export default class CreateSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) {}

  async execute({
    address,
    cnpj,
    name,
    password,
    username,
    contact
  }: CreateSchoolBody): Promise<{ account: Account; school: School }> {
    if (!cnpjValidator.isValid(cnpj)) throw new AppError('CNPJ não é válido');

    const [schoolByEmail, schoolByCNPJ] = await Promise.all([
      this.schoolRepository.findByEmail(contact.email),
      this.schoolRepository.findByCNPJ(cnpj)
    ]);
    if (schoolByEmail) throw new AppError('Email já está sendo utilizado');
    if (schoolByCNPJ) throw new AppError('CNPJ já está sendo utilizado');

    const createAccountService = new CreateAccountService(this.accountRepository);
    const account = await createAccountService.execute({
      username,
      password,
      type: AccountType.School
    });

    const school = await this.schoolRepository.create({
      _id: account._id,
      address,
      cnpj: cnpjValidator.format(cnpj),
      name,
      contact
    });

    return { account, school };
  }
}
