import request from 'supertest';
import app from '@shared/infra/http/app';
import { State } from '@shared/types/enums';
import { Application } from 'express';
import ConfirmSchoolDTO from '@modules/school/dtos/ConfirmSchoolDTO';

describe('/school/confirmSchool', () => {
  let application: Application;

  beforeAll(async () => {
    application = await app();
  });

  it('should be able to create to confirm a school', async () => {
    const schoolResponse = await request(application)
      .post('/school/createSchool')
      .send({
        username: 'johndoe',
        password: 'password',
        name: 'John Doe',
        cnpj: '40042391000121',
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

    const response = await request(application)
      .put(`/school/confirmSchool`)
      .send({
        _id: schoolResponse.body._id
      } as ConfirmSchoolDTO);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(200);
  });

  it('should not be able to create to confirm a school without sending id', async () => {
    const response = await request(application).put('/school/confirmSchool').send({});

    expect(response.body.status).toBe('error');
    expect(response.status).toBe(400);
  });
});
