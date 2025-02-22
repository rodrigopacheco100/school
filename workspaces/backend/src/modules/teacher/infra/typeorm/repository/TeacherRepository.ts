import CreateTeacherDTO from '@modules/teacher/dtos/CreateTeacherDTO';
import ITeacherRepository from '@modules/teacher/repository/ITeacherRepository';
import { AccountType } from '@shared/types/enums';
import { ObjectID } from 'mongodb';
import { getMongoRepository } from 'typeorm';
import Teacher from '../entity/Teacher';

export default class TeacherRepository implements ITeacherRepository {
  async create({ schoolId, ...params }: CreateTeacherDTO): Promise<Teacher> {
    const teacherRepository = getMongoRepository(Teacher);
    const teacher = teacherRepository.create({
      ...params,
      schoolId: new ObjectID(schoolId),
      type: AccountType.Teacher,
      confirmedAt: null
    });
    await teacherRepository.save(teacher);
    return teacher;
  }

  async findById(id: string): Promise<Teacher> {
    const teacherRepository = getMongoRepository(Teacher);
    const teacher = await teacherRepository.findOne({
      where: { _id: new ObjectID(id) }
    });
    return teacher;
  }

  async findByEmail(email: string): Promise<Teacher> {
    const teacherRepository = getMongoRepository(Teacher);
    const teacher = await teacherRepository.findOne({
      where: { 'contact.email': email }
    });
    return teacher;
  }

  async findByCPF(cpf: string): Promise<Teacher> {
    const teacherRepository = getMongoRepository(Teacher);
    const teacher = await teacherRepository.findOne({ where: { cpf } });
    return teacher;
  }
}
