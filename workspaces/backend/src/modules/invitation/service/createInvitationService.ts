import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import IStudentRepository from '@modules/student/repository/IStudentRepository';
import ITeacherRepository from '@modules/teacher/repository/ITeacherRepository';
import { AccountType } from '@shared/types/enums';
import IInvitationRepository from '../repository/IInvitationRepository';
import Invitation from '../infra/typeorm/entity/Invitation';
import CreateInvitationDTO from '../dtos/CreateInvitationDTO';

@injectable()
export default class CreateInvitationService {
  constructor(
    @inject('InvitationRepository')
    private invitationRepository: IInvitationRepository,

    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @inject('InvitationRepository')
    private studentRepository: IStudentRepository,

    @inject('InvitationRepository')
    private teacherRepository: ITeacherRepository
  ) {}

  async execute(params: CreateInvitationDTO): Promise<Invitation> {
    const school = await this.schoolRepository.findById(params.schoolId);
    if (!school) throw new AppError('School not found');

    let target;

    switch (params.targetType) {
      case AccountType.Student:
        target = await this.studentRepository.findById(params.targetId);
        break;
      case AccountType.Teacher:
        target = await this.teacherRepository.findById(params.targetId);
        break;
      default:
        throw new AppError('AccountType not allowed');
    }

    if (!target) throw new AppError('Target account not found');

    const Invitation = await this.invitationRepository.create(params);

    return Invitation;
  }
}
