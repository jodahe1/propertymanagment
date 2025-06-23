import { Roomtype } from 'src/roomtype/domain/entities';
import { RoomtypePersistenceEntity } from '../persistence-entities/roomtype.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RoomtypePersistenceMapper {
    static toDomain(entity: RoomtypePersistenceEntity): Roomtype {
        return new Roomtype(
            entity.hotelId,
            entity.name,
            entity.description,
            entity.maxGuests,
            entity.bedType,
            entity.amenities,
            entity.basePrice,
            entity.sizeSqft,
            entity.images,
            entity.id,
        );
    }

    static toEntity(domain: Roomtype, em: EntityManager): RoomtypePersistenceEntity {
        const entity = new RoomtypePersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.maxGuests = domain.maxGuests;
        entity.bedType = domain.bedType;
        entity.amenities = domain.amenities;
        entity.basePrice = domain.basePrice;
        entity.sizeSqft = domain.sizeSqft;
        entity.images = domain.images;
        return entity;
    }
}
