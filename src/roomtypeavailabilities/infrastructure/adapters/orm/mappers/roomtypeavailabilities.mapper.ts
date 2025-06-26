import { Roomtypeavailabilities } from 'src/roomtypeavailabilities/domain/entities';
import { RoomtypeavailabilitiesPersistenceEntity } from '../persistence-entities/roomtypeavailabilities.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RoomtypeavailabilitiesPersistenceMapper {
    static toDomain(entity: RoomtypeavailabilitiesPersistenceEntity): Roomtypeavailabilities {
        return new Roomtypeavailabilities(
            entity.roomTypeId,
            entity.date,
            entity.availableQuantity,
            entity.priceModifier,
            entity.minStayNights,
            entity.maxStayNights,
            entity.blockedReason,
            entity.id,
        );
    }

    static toEntity(domain: Roomtypeavailabilities, em: EntityManager): RoomtypeavailabilitiesPersistenceEntity {
        const entity = new RoomtypeavailabilitiesPersistenceEntity();
        entity.id = domain.id;
        entity.roomTypeId = domain.roomTypeId;
        entity.date = domain.date;
        entity.availableQuantity = domain.availableQuantity;
        entity.priceModifier = domain.priceModifier;
        entity.minStayNights = domain.minStayNights;
        entity.maxStayNights = domain.maxStayNights;
        entity.blockedReason = domain.blockedReason;
        return entity;
    }
}
