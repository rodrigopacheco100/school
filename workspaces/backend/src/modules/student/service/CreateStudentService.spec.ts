import 'reflect-metadata';
import { State } from '@shared/types/enums';
import AppError from '@shared/infra/http/error/AppError';
import { date } from '@shared/utils';
import School from '@modules/school/infra/typeorm/entity/School';
import CreateSchoolService from '@modules/school/service/CreateSchoolService';
import FakeSchoolRepository from '@modules/school/repository/fakes/FakeSchoolRepository';
import CreateStudentService from './CreateStudentService';
import FakeStudentRepository from '../repository/fakes/FakeStudentRepository';
import IStudentRepository from '../repository/IStudentRepository';

describe('CreateStudent', () => {
  let studentRepository: IStudentRepository;
  let createStudentService: CreateStudentService;
  let school: School;

  beforeAll(async () => {
    school = await new CreateSchoolService(new FakeSchoolRepository()).execute({
      password: 'password',
      name: 'John Doe',
      cnpj: '95983747000113',
      email: 'johndoe@email.com',
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });
  });

  beforeEach(() => {
    studentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(studentRepository);
  });

  it('should create a student', async () => {
    const student = await createStudentService.execute({
      email: 'johndoe@email.com',
      password: 'password',
      schoolId: school._id.toHexString(),
      name: 'John Doe',
      cpf: '64249678008',
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      parents: [
        {
          name: 'John Doe Mother',
          birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
          cpf: '48884199069',
          phones: ['85988779988']
        }
      ],
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    expect(student).toHaveProperty('_id');
  });

  it('should create a student without cpf', async () => {
    const student = await createStudentService.execute({
      email: 'johndoe@email.com',
      password: 'password',
      schoolId: school._id.toHexString(),
      name: 'John Doe',
      cpf: null,
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      parents: [
        {
          name: 'John Doe Mother',
          birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
          cpf: '48884199069',
          phones: ['85988779988']
        }
      ],
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    expect(student).toHaveProperty('_id');
  });

  it('should not create a student with invalid cpf', async () => {
    await expect(
      createStudentService.execute({
        email: 'johndoe@email.com',
        password: 'password',
        schoolId: school._id.toHexString(),
        name: 'John Doe',
        cpf: '64249678012',
        birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
        parents: [
          {
            name: 'John Doe Mother',
            birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
            cpf: '48884199069',
            phones: ['85988779988']
          }
        ],
        address: {
          cep: '99999-000',
          city: 'Cidade',
          neighborhood: 'Bairro',
          number: 123,
          state: State.Distrito_Federal,
          street: 'Rua'
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a student with any parent with invalid cpf', async () => {
    await expect(
      createStudentService.execute({
        email: 'johndoe@email.com',
        password: 'password',
        schoolId: school._id.toHexString(),
        name: 'John Doe',
        cpf: '64249678008',
        birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
        parents: [
          {
            name: 'John Doe Mother',
            birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
            cpf: '48884199061',
            phones: ['85988779988']
          }
        ],
        address: {
          cep: '99999-000',
          city: 'Cidade',
          neighborhood: 'Bairro',
          number: 123,
          state: State.Distrito_Federal,
          street: 'Rua'
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a student with the same cpf', async () => {
    await createStudentService.execute({
      email: 'johndoe@email.com',
      password: 'password',
      schoolId: school._id.toHexString(),
      name: 'John Doe',
      cpf: '64249678008',
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      parents: [
        {
          name: 'John Doe Mother',
          birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
          cpf: '48884199069',
          phones: ['85988779988']
        }
      ],
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    await expect(
      createStudentService.execute({
        email: 'johndoe@email.com',
        password: 'password',
        schoolId: school._id.toHexString(),
        name: 'John Doe',
        cpf: '64249678008',
        birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
        parents: [
          {
            name: 'John Doe Mother',
            birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
            cpf: '48884199069',
            phones: ['85988779988']
          }
        ],
        address: {
          cep: '99999-000',
          city: 'Cidade',
          neighborhood: 'Bairro',
          number: 123,
          state: State.Distrito_Federal,
          street: 'Rua'
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a student with the same email', async () => {
    await createStudentService.execute({
      email: 'johndoe@email.com',
      password: 'password',
      schoolId: school._id.toHexString(),
      name: 'John Doe',
      cpf: '64249678008',
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      parents: [
        {
          name: 'John Doe Mother',
          birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
          cpf: '48884199069',
          phones: []
        }
      ],
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    await expect(
      createStudentService.execute({
        email: 'johndoe@email.com',
        password: 'password',
        schoolId: school._id.toHexString(),
        name: 'John Doe',
        cpf: '48368660068',
        birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
        parents: [
          {
            name: 'John Doe Mother',
            birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
            cpf: '48884199069',
            phones: []
          }
        ],
        address: {
          cep: '99999-000',
          city: 'Cidade',
          neighborhood: 'Bairro',
          number: 123,
          state: State.Distrito_Federal,
          street: 'Rua'
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
