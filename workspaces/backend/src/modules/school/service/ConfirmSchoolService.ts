import AppError from '@shared/infra/http/error/AppError';
import { inject, injectable } from 'tsyringe';
import School from '../infra/typeorm/entity/School';
import ISchoolRepository from '../repository/ISchoolRepository';

@injectable()
export default class ConfirmSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  async execute(id: string): Promise<School> {
    const checkedSchool = await this.schoolRepository.findById(id);

    if (!checkedSchool) throw new AppError('School not found');
    if (checkedSchool.confirmedAt) throw new AppError('Escola already confirmed');

    const school = await this.schoolRepository.update(id, { confirmedAt: new Date() });
    return school;
  }
}
