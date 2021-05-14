import { container } from 'tsyringe';

import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import SchoolRepository from '@modules/school/infra/typeorm/repository/SchoolRepository';
import FakeSchoolRepository from '@modules/school/repository/fakes/FakeSchoolRepository';

import ITeacherRepository from '@modules/teacher/repository/ITeacherRepository';
import TeacherRepository from '@modules/teacher/infra/typeorm/repository/TeacherRepository';
import FakeTeacherRepository from '@modules/teacher/repository/fakes/FakeTeacherRepository';

import IStudentRepository from '@modules/student/repository/IStudentRepository';
import StudentRepository from '@modules/student/infra/typeorm/repository/StudentRepository';
import FakeStudentRepository from '@modules/student/repository/fakes/FakeStudentRepository';

export default (): void => {
  container.registerSingleton<ISchoolRepository>(
    'SchoolRepository',
    process.env.NODE_ENV === 'TEST' ? FakeSchoolRepository : SchoolRepository
  );

  container.registerSingleton<ITeacherRepository>(
    'TeacherRepository',
    process.env.NODE_ENV === 'TEST' ? FakeTeacherRepository : TeacherRepository
  );

  container.registerSingleton<IStudentRepository>(
    'StudentRepository',
    process.env.NODE_ENV === 'TEST' ? FakeStudentRepository : StudentRepository
  );
};
