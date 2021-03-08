import { container } from 'tsyringe';

import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import SchoolRepository from '@modules/school/infra/typeorm/repository/SchoolRepository';
import IAccountRepository from '@modules/account/repository/IAccountRepository';
import AccountRepository from '@modules/account/infra/typeorm/repository/AccountRepository';

export default (): void => {
  container.registerSingleton<ISchoolRepository>(
    'SchoolRepository',
    SchoolRepository
  );
  container.registerSingleton<IAccountRepository>(
    'AccountRepository',
    AccountRepository
  );
};
