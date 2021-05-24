import 'reflect-metadata';
import { GradeType, State } from '@shared/types/enums';
import AppError from '@shared/infra/http/error/AppError';
import { date } from '@shared/utils';
import School from '@modules/school/infra/typeorm/entity/School';
import CreateSchoolService from '@modules/school/service/CreateSchoolService';
import FakeSchoolRepository from '@modules/school/repository/fakes/FakeSchoolRepository';
import CreateTeacherService from './CreateTeacherService';
import FakeTeacherRepository from '../repository/fakes/FakeTeacherRepository';
import ITeacherRepository from '../repository/ITeacherRepository';

describe('CreateTeacher', () => {
  let teacherRepository: ITeacherRepository;
  let createTeacherService: CreateTeacherService;
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
    teacherRepository = new FakeTeacherRepository();
    createTeacherService = new CreateTeacherService(teacherRepository);
  });

  it('should create a teacher', async () => {
    const teacher = await createTeacherService.execute({
      password: 'password',
      name: 'John Doe',
      schoolId: school._id.toHexString(),
      cpf: '64249678008',
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
    });

    expect(teacher).toHaveProperty('_id');
  });

  it('should not create a teacher with invalid cpf', async () => {
    await expect(
      createTeacherService.execute({
        password: 'password',
        name: 'John Doe',
        schoolId: school._id.toHexString(),
        cpf: '64249678007',
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
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a teacher with the same cpf', async () => {
    await createTeacherService.execute({
      password: 'password',
      name: 'John Doe',
      schoolId: school._id.toHexString(),
      cpf: '64249678008',
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
    });

    await expect(
      createTeacherService.execute({
        password: 'password',
        name: 'John Doe',
        schoolId: school._id.toHexString(),
        cpf: '64249678008',
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
        email: 'johndoe2@email.com',
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

  it('should not create a teacher with the same email', async () => {
    await createTeacherService.execute({
      password: 'password',
      name: 'John Doe',
      schoolId: school._id.toHexString(),
      cpf: '64249678008',
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
    });

    await expect(
      createTeacherService.execute({
        password: 'password',
        name: 'John Doe',
        schoolId: school._id.toHexString(),
        cpf: '36043660032',
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
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
