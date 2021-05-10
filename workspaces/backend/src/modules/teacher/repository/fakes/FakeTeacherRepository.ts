import CreateTeacherDTO from '@modules/teacher/dtos/CreateTeacherDTO';
import Teacher from '@modules/teacher/infra/typeorm/entity/Teacher';
import { AccountType } from '@shared/types/enums';

import { ObjectID } from 'mongodb';
import ITeacherRepository from '../ITeacherRepository';

export default class FakeTeacherRepository implements ITeacherRepository {
  teachers: Teacher[] = [];

  async create({ schoolId, ...rest }: CreateTeacherDTO): Promise<Teacher> {
    const teacher: Teacher = {
      _id: new ObjectID(),
      ...rest,
      schoolId: new ObjectID(schoolId),
      type: AccountType.Teacher,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.teachers.push(teacher);

    return teacher;
  }

  async findByUsername(username: string): Promise<Teacher> {
    return this.teachers.find(teacher => teacher.username === username);
  }

  async findById(id: string): Promise<Teacher> {
    return this.teachers.find(teacher => teacher._id === new ObjectID(id));
  }

  async findByEmail(email: string): Promise<Teacher> {
    return this.teachers.find(teacher => teacher.contact.email === email);
  }

  async findByCPF(cpf: string): Promise<Teacher> {
    return this.teachers.find(teacher => teacher.cpf === cpf);
  }
}
