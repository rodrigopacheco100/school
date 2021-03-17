import CreateStudentDTO from '@modules/student/dtos/CreateStudentDTO';
import IStudentRepository from '@modules/student/repository/IStudentRepository';
import { AccountType } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import { getMongoRepository } from 'typeorm';

import Student from '../entity/Student';

export default class StudentRepository implements IStudentRepository {
  async create(params: CreateStudentDTO): Promise<Student> {
    const studentRepository = getMongoRepository(Student);
    const student = studentRepository.create({
      ...params,
      type: AccountType.Student
    });
    await studentRepository.save(student);
    return student;
  }

  async findById(id: string): Promise<Student> {
    const studentRepository = getMongoRepository(Student);
    const student = await studentRepository.findOne({
      where: { _id: new ObjectID(id) }
    });
    return student;
  }

  async findByUsername(username: string): Promise<Student> {
    const studentRepository = getMongoRepository(Student);
    const student = await studentRepository.findOne({ where: { username } });
    return student;
  }

  async findByEmail(email: string): Promise<Student> {
    const studentRepository = getMongoRepository(Student);
    const student = await studentRepository.findOne({
      where: { 'contact.email': email }
    });
    return student;
  }

  async findByCPF(cpf: string): Promise<Student> {
    const studentRepository = getMongoRepository(Student);
    const student = await studentRepository.findOne({ where: { cpf } });
    return student;
  }
}
