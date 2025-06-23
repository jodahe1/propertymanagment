import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TGuestRepository } from "src/guest/application/ports/outgoing/guest.repository";
import { Guest } from "src/guest/domain/entities";
import { GuestPersistenceMapper } from "../mappers/guest.mapper";
import { GuestPersistenceEntity } from "../persistence-entities/guest.persistence.entity";

@Injectable()
export class GuestRepository extends MikroOrmBaseRepository<Guest> implements TGuestRepository {
    constructor(
        @InjectRepository(GuestPersistenceEntity)
        private readonly repo: EntityRepository<GuestPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: GuestPersistenceEntity): Guest {
        return GuestPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Guest): GuestPersistenceEntity {
        return GuestPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: GuestPersistenceEntity, updates: Guest): void {
        if (updates.fullName) entity.fullName = updates.fullName;
        if (updates.email) entity.email = updates.email;
        if (updates.phoneNumber !== undefined) entity.phoneNumber = updates.phoneNumber;
        if (updates.address !== undefined) entity.address = updates.address;
        if (updates.city !== undefined) entity.city = updates.city;
        if (updates.country !== undefined) entity.country = updates.country;
        if (updates.zipCode !== undefined) entity.zipCode = updates.zipCode;
        if (updates.dateOfBirth !== undefined) entity.dateOfBirth = updates.dateOfBirth;
        if (updates.nationality !== undefined) entity.nationality = updates.nationality;
        if (updates.idDocumentType) entity.idDocumentType = updates.idDocumentType;
        if (updates.idDocumentNumber) entity.idDocumentNumber = updates.idDocumentNumber;
        if (updates.notes !== undefined) entity.notes = updates.notes;
    }
}
