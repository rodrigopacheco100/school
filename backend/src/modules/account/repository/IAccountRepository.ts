import CreateAccountDTO from '../dtos/CreateAccountDTO';
import UpdateAccountDTO from '../dtos/UpdateAccountDTO';
import Account from '../infra/typeorm/entity/Account';

export default interface IAccountRepository {
  create(params: CreateAccountDTO): Promise<Account>;
  update(id: string, params: UpdateAccountDTO): Promise<number>;
  findByUsername(username: string): Promise<Account>;
}
