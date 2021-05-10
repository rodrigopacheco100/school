import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import School from '@modules/school/infra/typeorm/entity/School';
import ISchoolRepository from '@modules/school/repository/ISchoolRepository';
import { AccountType } from '@shared/types/enums';
import { RecursivePartial } from '@shared/types/utilTypes';

import { ObjectID } from 'mongodb';

export default class FakeSchoolRepository implements ISchoolRepository {
  schools: School[] = [];

  async create({ ...rest }: CreateSchoolDTO): Promise<School> {
    const school: School = {
      _id: new ObjectID(),
      ...rest,
      type: AccountType.School,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.schools.push(school);

    return school;
  }

  async findById(id: string): Promise<School> {
    return this.schools.find(school => ObjectID.createFromHexString(id).equals(school._id));
  }

  async findByUsername(username: string): Promise<School> {
    return this.schools.find(school => school.username === username);
  }

  async findByEmail(email: string): Promise<School> {
    return this.schools.find(school => school.contact.email === email);
  }

  async findByCNPJ(cpnj: string): Promise<School> {
    return this.schools.find(school => school.cnpj === cpnj);
  }

  async update(id: string, data: RecursivePartial<School>): Promise<School> {
    const school = await this.findById(id);
    Object.assign(school, { ...data });
    return school;
  }
}
