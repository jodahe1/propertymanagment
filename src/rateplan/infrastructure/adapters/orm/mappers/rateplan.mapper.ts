import { Rateplan } from 'src/rateplan/domain/entities';
import { RateplanPersistenceEntity } from '../persistence-entities/rateplan.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RateplanPersistenceMapper {
    static toDomain(entity: RateplanPersistenceEntity): Rateplan {
        return new Rateplan(
            entity.hotelId,
            entity.roomTypeId,
            entity.name,
            entity.description,
            entity.basePriceModifier,
            entity.minNights,
            entity.maxNights,
            entity.validFrom,
            entity.validTo,
            entity.status,
            entity.id,
        );
    }

    static toEntity(domain: Rateplan, em: EntityManager): RateplanPersistenceEntity {
        const entity = new RateplanPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.roomTypeId = domain.roomTypeId;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.basePriceModifier = domain.basePriceModifier;
        entity.minNights = domain.minNights;
        entity.maxNights = domain.maxNights;
        entity.validFrom = domain.validFrom;
        entity.validTo = domain.validTo;
        entity.status = domain.status;
        return entity;
    }
}
