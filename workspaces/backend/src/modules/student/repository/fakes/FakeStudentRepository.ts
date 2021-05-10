import CreateStudentDTO from '@modules/student/dtos/CreateStudentDTO';
import Student from '@modules/student/infra/typeorm/entity/Student';
import { AccountType } from '@shared/types/enums';

import { ObjectID } from 'mongodb';
import IStudentRepository from '../IStudentRepository';

export default class FakeStudentRepository implements IStudentRepository {
  students: Student[] = [];

  async create({ schoolId, ...rest }: CreateStudentDTO): Promise<Student> {
    const student: Student = {
      _id: new ObjectID(),
      schoolId: new ObjectID(schoolId),
      ...rest,
      type: AccountType.Student,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.students.push(student);

    return student;
  }

  async findByUsername(username: string): Promise<Student> {
    return this.students.find(student => student.username === username);
  }

  async findById(id: string): Promise<Student> {
    return this.students.find(student => student._id === new ObjectID(id));
  }

  async findByEmail(email: string): Promise<Student> {
    return this.students.find(student => student.contact.email === email);
  }

  async findByCPF(cpf: string): Promise<Student> {
    return this.students.find(student => student.cpf === cpf);
  }
}
