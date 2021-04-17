import CreateInvitationDTO from '@modules/invitation/dtos/CreateInvitationDTO';
import IInvitationRepository from '@modules/invitation/repository/IInvitationRepository';
import { RecursivePartial } from '@shared/types/utilTypes';
import { ObjectID } from 'mongodb';
import { getMongoRepository } from 'typeorm';

import Invitation from '../entity/Invitation';

export default class InvitationRepository implements IInvitationRepository {
  async create({ schoolId, targetId, ...params }: CreateInvitationDTO): Promise<Invitation> {
    const invitationRepository = getMongoRepository(Invitation);
    const invitation = invitationRepository.create({
      ...params,
      schoolId: new ObjectID(schoolId),
      targetId: new ObjectID(targetId),
      acceptedAt: null
    });
    await invitationRepository.save(invitation);
    return invitation;
  }

  async findById(id: string): Promise<Invitation> {
    const invitationRepository = getMongoRepository(Invitation);
    const invitation = await invitationRepository.findOne(id);
    return invitation;
  }

  async update(id: string, data: RecursivePartial<Invitation>): Promise<Invitation> {
    const invitationRepository = getMongoRepository(Invitation);
    const invitation = await this.findById(id);
    Object.assign(invitation, { ...data });
    await invitationRepository.save(invitation);

    return invitation;
  }
}
