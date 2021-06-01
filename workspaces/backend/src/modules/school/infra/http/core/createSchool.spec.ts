import request from 'supertest';
import app from '@shared/infra/http/app';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import { State } from '@shared/types/enums';
import { Application } from 'express';
import { Omit } from '@shared/types/utilTypes';

describe('/school/createSchool', () => {
  let application: Application;

  beforeAll(async () => {
    application = await app();
  });

  it('should be able to create a school', async () => {
    const body: CreateSchoolDTO = {
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
    };

    const response = await request(application).post('/school/createSchool').send(body);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(201);
  });

  it('should not be able to create a school with wrong schema', async () => {
    const body: Omit<CreateSchoolDTO, 'cnpj'> = {
      password: 'password',
      name: 'John Doe',
      email: 'johndoe@email.com',
      address: {
        cep: '99999-000',
        city: 'Cidade',
        neighborhood: 'Bairro',
        number: 123,
        state: State.Distrito_Federal,
        street: 'Rua'
      }
    };

    const response = await request(application).post('/school/createSchool').send(body);

    expect(response.status).toBe(400);
  });
});
