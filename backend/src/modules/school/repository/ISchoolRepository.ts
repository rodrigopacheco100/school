import CreateSchoolDTO from '../dtos/CreateSchoolDTO';
import School from '../infra/typeorm/entity/School';

export default interface ISchoolRepository {
  create: (params: CreateSchoolDTO) => Promise<School>;
  findById: (id: string) => Promise<School>;
  findByEmail: (email: string) => Promise<School>;
  findByCNPJ: (cnpj: string) => Promise<School>;
}
