import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import { AccountType } from '@shared/types/enums';
import { RecursivePartial } from '@shared/types/utilTypes';
import { getMongoRepository } from 'typeorm';

import School from '../entity/School';

export default class SchoolRepository implements ISchoolRepository {
  async create(params: CreateSchoolDTO): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = schoolRepository.create({ ...params, type: AccountType.School });
    await schoolRepository.save(school);
    return school;
  }

  async findById(id: string): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = await schoolRepository.findOne(id);
    return school;
  }

  async findByEmail(email: string): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = await schoolRepository.findOne({
      where: { 'contact.email': email }
    });
    return school;
  }

  async findByUsername(username: string): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = await schoolRepository.findOne({
      where: { username }
    });
    return school;
  }

  async findByCNPJ(cnpj: string): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = await schoolRepository.findOne({ where: { cnpj } });
    return school;
  }

  async update(id: string, data: RecursivePartial<School>): Promise<School> {
    const schoolRepository = getMongoRepository(School);
    const school = await schoolRepository.findOne(id);
    Object.assign(school, { ...data });
    await schoolRepository.save(school);

    return school;
  }
}
