import { Omit } from '@shared/types/utilTypes';
import Invitation from '../infra/typeorm/entity/Invitation';

type T = Omit<Invitation, '_id' | 'updatedAt' | 'createdAt' | 'acceptedAt' | 'targetId' | 'schoolId'>;

interface CreateInvitationDTO extends T {
  targetId: string;
  schoolId: string;
}

export default CreateInvitationDTO;
