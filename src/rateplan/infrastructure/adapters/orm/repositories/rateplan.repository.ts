import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRateplanRepository } from "src/rateplan/application/ports/outgoing/rateplan.repository";
import { Rateplan } from "src/rateplan/domain/entities";
import { RateplanPersistenceMapper } from "../mappers/rateplan.mapper";
import { RateplanPersistenceEntity } from "../persistence-entities/rateplan.persistence.entity";

@Injectable()
export class RateplanRepository extends MikroOrmBaseRepository<Rateplan> implements TRateplanRepository {
    constructor(
        @InjectRepository(RateplanPersistenceEntity)
        private readonly repo: EntityRepository<RateplanPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: RateplanPersistenceEntity): Rateplan {
        return RateplanPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Rateplan): RateplanPersistenceEntity {
        return RateplanPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: RateplanPersistenceEntity, updates: Rateplan): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.roomTypeId) entity.roomTypeId = updates.roomTypeId;
        if (updates.name) entity.name = updates.name;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.basePriceModifier) entity.basePriceModifier = updates.basePriceModifier;
        if (updates.minNights !== undefined) entity.minNights = updates.minNights;
        if (updates.maxNights !== undefined) entity.maxNights = updates.maxNights;
        if (updates.validFrom !== undefined) entity.validFrom = updates.validFrom;
        if (updates.validTo !== undefined) entity.validTo = updates.validTo;
        if (updates.status) entity.status = updates.status;
    }
}
