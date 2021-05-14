import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import ConfirmSchoolDTO from '../dtos/ConfirmSchoolDTO';
import School from '../infra/typeorm/entity/School';
import ISchoolRepository from '../repository/ISchoolRepository';

@injectable()
export default class ConfirmSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  async execute({ _id }: ConfirmSchoolDTO): Promise<School> {
    const checkedSchool = await this.schoolRepository.findById(_id);

    if (!checkedSchool) throw new AppError('School not found');
    if (checkedSchool.confirmedAt) throw new AppError('School already confirmed');

    const school = await this.schoolRepository.update(_id, { confirmedAt: new Date() });
    return school;
  }
}
