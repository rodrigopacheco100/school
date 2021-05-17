import CreateStudentDTO from '../dtos/CreateStudentDTO';
import Student from '../infra/typeorm/entity/Student';

export default interface IStudentRepository {
  create: (params: CreateStudentDTO) => Promise<Student>;
  findById: (id: string) => Promise<Student>;
  findByEmail: (email: string) => Promise<Student>;
  findByCPF: (cpf: string) => Promise<Student>;
}
