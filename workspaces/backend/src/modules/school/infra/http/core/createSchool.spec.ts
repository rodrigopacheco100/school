import request from 'supertest';
import app from '@shared/infra/http/app';
import { State } from '@shared/types/enums';
import { Application } from 'express';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';

describe('/school/createSchool', () => {
  let application: Application;

  beforeAll(async () => {
    application = await app();
  });

  it('should be able to create a school', async () => {
    const response = await request(application)
      .post('/school/createSchool')
      .send({
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
      } as CreateSchoolDTO);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(201);
  });

  it('should not be able to create a school with wrong schema', async () => {
    const response = await request(application)
      .post('/school/createSchool')
      .send({
        username: 'johndoe',
        password: 'password',
        name: 'John Doe',
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

    expect(response.body.status).toBe('error');
    expect(response.status).toBe(400);
  });
});
