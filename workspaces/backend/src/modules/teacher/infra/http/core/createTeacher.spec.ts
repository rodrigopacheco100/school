import request from 'supertest';
import { Application } from 'express';
import { ObjectID } from 'mongodb';

import app from '@shared/infra/http/app';
import School from '@modules/school/infra/typeorm/entity/School';
import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import CreateTeacherDTO from '@modules/teacher/dtos/CreateTeacherDTO';
import { GradeType, State } from '@shared/types/enums';
import { date } from '@shared/utils';
import { Omit } from '@shared/types/utilTypes';

describe('/teacher/createTeacher', () => {
  let application: Application;
  let school: School;

  beforeAll(async () => {
    application = await app();

    const body: CreateSchoolDTO = {
      password: 'password',
      name: 'John Doe',
      cnpj: '55079603000112',
      email: 'teacherexample@email.com',
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

  it('should be able to create a teacher', async () => {
    const body: CreateTeacherDTO = {
      password: 'password',
      name: 'John Doe',
      schoolId: new ObjectID(school._id).toHexString(),
      cpf: '07344324024',
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      grades: [
        {
          course: 'course',
          educationalInstitution: 'educationalInstitution',
          type: GradeType.Course,
          startDate: date.convertBrazilianStringDateToUTC('01/01/1996'),
          finishDate: date.convertBrazilianStringDateToUTC('01/01/2000')
        }
      ],
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

    const response = await request(application).post('/teacher/createTeacher').send(body);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(201);
  });

  it('should not be able to create a teacher with wrong schema', async () => {
    const body: Omit<CreateTeacherDTO, 'cpf'> = {
      password: 'password',
      name: 'John Doe',
      schoolId: new ObjectID(school._id).toHexString(),
      birth: date.convertBrazilianStringDateToUTC('01/01/2000'),
      grades: [
        {
          course: 'course',
          educationalInstitution: 'educationalInstitution',
          type: GradeType.Course,
          startDate: date.convertBrazilianStringDateToUTC('01/01/1996'),
          finishDate: date.convertBrazilianStringDateToUTC('01/01/2000')
        }
      ],
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

    const response = await request(application).post('/teacher/createTeacher').send(body);

    expect(response.status).toBe(400);
  });
});
