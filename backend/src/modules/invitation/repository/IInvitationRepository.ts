import { RecursivePartial } from '@shared/types/utilTypes';
import CreateInvitationDTO from '../dtos/CreateInvitationDTO';
import Invitation from '../infra/typeorm/entity/Invitation';

export default interface IInvitationRepository {
  create: (params: CreateInvitationDTO) => Promise<Invitation>;
  findById: (id: string) => Promise<Invitation>;
  update: (id: string, data: RecursivePartial<Invitation>) => Promise<Invitation>;
}
