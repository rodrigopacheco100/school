import { container } from 'tsyringe';

import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import SchoolRepository from '@modules/school/infra/typeorm/repository/SchoolRepository';
import ITeacherRepository from '@modules/teacher/repository/ITeacherRepository';
import TeacherRepository from '@modules/teacher/infra/typeorm/repository/TeacherRepository';
import IStudentRepository from '@modules/student/repository/IStudentRepository';
import StudentRepository from '@modules/student/infra/typeorm/repository/StudentRepository';
import IInvitationRepository from '@modules/invitation/repository/IInvitationRepository';
import InvitationRepository from '@modules/invitation/infra/typeorm/repository/InvitationRepository';

export default (): void => {
  container.registerSingleton<ISchoolRepository>('SchoolRepository', SchoolRepository);
  container.registerSingleton<ITeacherRepository>('TeacherRepository', TeacherRepository);
  container.registerSingleton<IStudentRepository>('StudentRepository', StudentRepository);
  container.registerSingleton<IInvitationRepository>('InvitationRepository', InvitationRepository);
};
