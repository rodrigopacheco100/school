import 'reflect-metadata';
import { State } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import AppError from '@shared/infra/http/error/AppError';
import FakeSchoolRepository from '../repository/fakes/FakeSchoolRepository';
import ISchoolRepository from '../repository/ISchoolRepository';
import ConfirmSchoolService from './ConfirmSchoolService';
import CreateSchoolService from './CreateSchoolService';

describe('ConfirmSchool', () => {
  let schoolRepository: ISchoolRepository;
  let createSchoolService: CreateSchoolService;
  let confirmSchoolService: ConfirmSchoolService;

  beforeEach(() => {
    schoolRepository = new FakeSchoolRepository();
    createSchoolService = new CreateSchoolService(schoolRepository);
    confirmSchoolService = new ConfirmSchoolService(schoolRepository);
  });

  it('should confirm a school', async () => {
    const school = await createSchoolService.execute({
      username: 'johndoe',
      password: 'password',
      name: 'John Doe',
      cnpj: '95983747000113',
      confirmedAt: null,
      contact: {
        email: 'johndoe@email.com'
      },
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    expect(school.confirmedAt).toBe(null);

    const confirmedSchool = await confirmSchoolService.execute(school._id.toHexString());

    expect(confirmedSchool.confirmedAt).toBeInstanceOf(Date);
  });

  it('should not confirm a school that does not exist', async () => {
    await expect(confirmSchoolService.execute(new ObjectID().toHexString())).rejects.toBeInstanceOf(AppError);
  });

  it('should not confirm a school twice', async () => {
    const school = await createSchoolService.execute({
      username: 'johndoe',
      password: 'password',
      name: 'John Doe',
      cnpj: '95983747000113',
      confirmedAt: null,
      contact: {
        email: 'johndoe@email.com'
      },
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    });

    expect(school.confirmedAt).toBe(null);
    const confirmedSchool = await confirmSchoolService.execute(school._id.toHexString());
    expect(confirmedSchool.confirmedAt).toBeInstanceOf(Date);
    await expect(confirmSchoolService.execute(school._id.toHexString())).rejects.toBeInstanceOf(AppError);
  });
});
