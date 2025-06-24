import { Promotion } from 'src/promotion/domain/entities';
import { PromotionPersistenceEntity } from '../persistence-entities/promotion.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class PromotionPersistenceMapper {
    static toDomain(entity: PromotionPersistenceEntity): Promotion {
        return new Promotion(
            entity.hotelId,
            entity.code,
            entity.discountType,
            entity.value,
            entity.validFrom,
            entity.validTo,
            entity.minStay,
            entity.id,
        );
    }

    static toEntity(domain: Promotion, em: EntityManager): PromotionPersistenceEntity {
        const entity = new PromotionPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.code = domain.code;
        entity.discountType = domain.discountType;
        entity.value = domain.value;
        entity.validFrom = domain.validFrom;
        entity.validTo = domain.validTo;
        entity.minStay = domain.minStay;
        return entity;
    }
}
