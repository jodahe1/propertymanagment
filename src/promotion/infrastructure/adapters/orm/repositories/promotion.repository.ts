import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TPromotionRepository } from "src/promotion/application/ports/outgoing/promotion.repository";
import { Promotion } from "src/promotion/domain/entities";
import { PromotionPersistenceMapper } from "../mappers/promotion.mapper";
import { PromotionPersistenceEntity } from "../persistence-entities/promotion.persistence.entity";

@Injectable()
export class PromotionRepository extends MikroOrmBaseRepository<Promotion> implements TPromotionRepository {
    constructor(
        @InjectRepository(PromotionPersistenceEntity)
        private readonly repo: EntityRepository<PromotionPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: PromotionPersistenceEntity): Promotion {
        return PromotionPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Promotion): PromotionPersistenceEntity {
        return PromotionPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: PromotionPersistenceEntity, updates: Promotion): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.code) entity.code = updates.code;
        if (updates.discountType) entity.discountType = updates.discountType;
        if (updates.value) entity.value = updates.value;
        if (updates.validFrom) entity.validFrom = updates.validFrom;
        if (updates.validTo) entity.validTo = updates.validTo;
        if (updates.minStay !== undefined) entity.minStay = updates.minStay;
    }
}
