import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { THousekeepingRepository } from "src/housekeeping/application/ports/outgoing/housekeeping.repository";
import { Housekeeping } from "src/housekeeping/domain/entities";
import { HousekeepingPersistenceMapper } from "../mappers/housekeeping.mapper";
import { HousekeepingPersistenceEntity } from "../persistence-entities/housekeeping.persistence.entity";

@Injectable()
export class HousekeepingRepository extends MikroOrmBaseRepository<Housekeeping> implements THousekeepingRepository {
    constructor(
        @InjectRepository(HousekeepingPersistenceEntity)
        private readonly repo: EntityRepository<HousekeepingPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: HousekeepingPersistenceEntity): Housekeeping {
        return HousekeepingPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Housekeeping): HousekeepingPersistenceEntity {
        return HousekeepingPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: HousekeepingPersistenceEntity, updates: Housekeeping): void {
        if (updates.roomId) entity.roomId = updates.roomId;
        if (updates.staffId) entity.staffId = updates.staffId;
        if (updates.status) entity.status = updates.status;
        if (updates.notes !== undefined) entity.notes = updates.notes;
        if (updates.completedAt !== undefined) entity.completedAt = updates.completedAt;
    }
}
