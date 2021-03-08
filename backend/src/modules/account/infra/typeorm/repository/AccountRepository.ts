import { getMongoRepository, ObjectID } from 'typeorm';
import CreateAccountDTO from '@modules/account/dtos/CreateAccountDTO';
import UpdateAccountDTO from '@modules/account/dtos/UpdateAccountDTO';
import IAccountRepository from '@modules/account/repository/IAccountRepository';
import Account from '../entity/Account';

export default class AccountRepository implements IAccountRepository {
  async create(params: CreateAccountDTO): Promise<Account> {
    const accountRepository = getMongoRepository(Account);
    const account = accountRepository.create(params);
    await accountRepository.save(account);
    return account;
  }

  async update(id: string, params: UpdateAccountDTO): Promise<number> {
    const accountRepository = getMongoRepository(Account);
    const rs = await accountRepository.updateOne(
      { where: { _id: new ObjectID(id) } },
      {
        $set: {
          params
        }
      }
    );

    return rs.modifiedCount;
  }

  async findByUsername(username: string): Promise<Account> {
    const accountRepository = getMongoRepository(Account);
    return accountRepository.findOne({ where: { username } });
  }
}
