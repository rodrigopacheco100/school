import AppError from '@shared/infra/http/error/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import CreateAccountDTO from '../dtos/CreateAccountDTO';
import Account from '../infra/typeorm/entity/Account';
import IAccountRepository from '../repository/IAccountRepository';

@injectable()
export default class CreateAccountService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) {}

  async execute({ password, ...rest }: CreateAccountDTO): Promise<Account> {
    const accountByUsername = await this.accountRepository.findByUsername(
      rest.username
    );

    if (accountByUsername)
      throw new AppError('Usuário já está sendo utilizado');

    const account = await this.accountRepository.create({
      password: await hash(password, 8),
      ...rest
    });

    delete account.password;

    return account;
  }
}
