import request from 'supertest';
import { ObjectID } from 'mongodb';
import { Application } from 'express';

import app from '@shared/infra/http/app';
import School from '@modules/school/infra/typeorm/entity/School';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import CreateStudentDTO from '@modules/student/dtos/CreateStudentDTO';
import { State } from '@shared/types/enums';
import { date } from '@shared/utils';
import { Omit } from '@shared/types/utilTypes';

describe('/student/createStudent', () => {
  let application: Application;
  let school: School;

  beforeAll(async () => {
    application = await app();

    const body: CreateSchoolDTO = {
      password: 'password',
      name: 'John Doe',
      cnpj: '91972809000130',
      email: 'studentexample@email.com',
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

    school = response.body;
  });

  it('should be able to create a student', async () => {
    const body: CreateStudentDTO = {
      email: 'johndoe@email.com',
      password: 'password',
      schoolId: new ObjectID(school._id).toHexString(),
      name: 'John Doe',
      cpf: '98947366021',
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
    };

    const response = await request(application).post('/student/createStudent').send(body);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(201);
  });

  it('should not be able to create a student with wrong schema', async () => {
    const body: Omit<CreateStudentDTO, 'email'> = {
      password: 'password',
      name: 'John Doe',
      cpf: '23519633000',
      schoolId: new ObjectID(school._id).toHexString(),
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
    };

    const response = await request(application).post('/student/createStudent').send(body);

    expect(response.status).toBe(400);
  });
});
