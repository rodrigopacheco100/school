import CreateSchoolDTO from '@modules/school/dtos/CreateSchoolDTO';
import School from '@modules/school/infra/typeorm/entity/School';
import ISchoolRepository from '@modules/school/repository/ISchoolRepository';

import { ObjectID } from 'typeorm';

export default class SchoolRepository implements ISchoolRepository {
  schools: School[] = [];

  async create({ _id, ...rest }: CreateSchoolDTO): Promise<School> {
    const school: School = {
      _id,
      ...rest,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.schools.push(school);

    return school;
  }

  async findById(id: string): Promise<School> {
    return this.schools.find(school => school._id === new ObjectID(id));
  }

  async findByEmail(email: string): Promise<School> {
    return this.schools.find(school => school.contact.email === email);
  }

  async findByCNPJ(cpnj: string): Promise<School> {
    return this.schools.find(school => school.cnpj === cpnj);
  }
}
