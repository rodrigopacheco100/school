import 'reflect-metadata';
import { State } from '@shared/types/enums';
import AppError from '@shared/infra/http/error/AppError';
import FakeSchoolRepository from '../repository/fakes/FakeSchoolRepository';
import ISchoolRepository from '../repository/ISchoolRepository';
import CreateSchoolService from './CreateSchoolService';

describe('CreateSchool', () => {
  let schoolRepository: ISchoolRepository;
  let createSchoolService: CreateSchoolService;

  beforeEach(() => {
    schoolRepository = new FakeSchoolRepository();
    createSchoolService = new CreateSchoolService(schoolRepository);
  });

  it('should create a school', async () => {
    const school = await createSchoolService.execute({
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

    expect(school).toHaveProperty('_id');
  });

  it('should not create a school with invalid cnpj', async () => {
    await expect(
      createSchoolService.execute({
        password: 'password',
        name: 'John Doe',
        cnpj: '95983747009999',
        email: 'johndoe@email.com.br',
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

  it('should not create a school with same cnpj', async () => {
    await createSchoolService.execute({
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

    await expect(
      createSchoolService.execute({
        password: 'password',
        name: 'John Doe',
        cnpj: '95983747000113',
        email: 'johndoe@email.com.br',
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

  it('should not create a school with same email', async () => {
    await createSchoolService.execute({
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

    await expect(
      createSchoolService.execute({
        password: 'password',
        name: 'John Doe',
        cnpj: '40042391000121',
        email: 'johndoe@email.com',
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
