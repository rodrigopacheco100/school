import CreateTeacherDTO from '../dtos/CreateTeacherDTO';
import Teacher from '../infra/typeorm/entity/Teacher';

export default interface ITeacherRepository {
  create: (params: CreateTeacherDTO) => Promise<Teacher>;
  findById: (id: string) => Promise<Teacher>;
  findByUsername: (username: string) => Promise<Teacher>;
  findByEmail: (email: string) => Promise<Teacher>;
  findByCPF: (cpf: string) => Promise<Teacher>;
}
