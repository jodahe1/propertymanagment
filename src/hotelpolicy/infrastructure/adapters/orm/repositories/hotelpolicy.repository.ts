import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { THotelpolicyRepository } from "src/hotelpolicy/application/ports/outgoing/hotelpolicy.repository";
import { Hotelpolicy } from "src/hotelpolicy/domain/entities";
import { HotelpolicyPersistenceMapper } from "../mappers/hotelpolicy.mapper";
import { HotelpolicyPersistenceEntity } from "../persistence-entities/hotelpolicy.persistence.entity";

@Injectable()
export class HotelpolicyRepository extends MikroOrmBaseRepository<Hotelpolicy> implements THotelpolicyRepository {
    constructor(
        @InjectRepository(HotelpolicyPersistenceEntity)
        private readonly repo: EntityRepository<HotelpolicyPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: HotelpolicyPersistenceEntity): Hotelpolicy {
        return HotelpolicyPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Hotelpolicy): HotelpolicyPersistenceEntity {
        return HotelpolicyPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: HotelpolicyPersistenceEntity, updates: Hotelpolicy): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.policyType) entity.policyType = updates.policyType;
        if (updates.description) entity.description = updates.description;
        if (updates.effectiveDate !== undefined) entity.effectiveDate = updates.effectiveDate;
    }
}
