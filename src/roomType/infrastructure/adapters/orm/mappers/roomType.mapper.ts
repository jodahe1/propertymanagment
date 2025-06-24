import { RoomType } from 'src/roomType/domain/entities';
import { RoomTypePersistenceEntity } from '../persistence-entities/roomType.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RoomTypePersistenceMapper {
    static toDomain(entity: RoomTypePersistenceEntity): RoomType {
        return new RoomType(
            entity.hotel_id,
            entity.name,
            entity.max_guests,
            entity.max_adults,
            entity.max_children,
            entity.bed_type,
            entity.base_price,
            entity.quantity,
            entity.description,
            entity.amenities,
            entity.size_sqm,
            entity.extra_bed_capacity,
            entity.id,
        );
    }

    static toEntity(domain: RoomType, em: EntityManager): RoomTypePersistenceEntity {
        const entity = new RoomTypePersistenceEntity();
        entity.id = domain.id;
        entity.hotel_id = domain.hotel_id;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.max_guests = domain.max_guests;
        entity.max_adults = domain.max_adults;
        entity.max_children = domain.max_children;
        entity.bed_type = domain.bed_type;
        entity.amenities = domain.amenities;
        entity.base_price = domain.base_price;
        entity.size_sqm = domain.size_sqm;
        entity.quantity = domain.quantity;
        entity.extra_bed_capacity = domain.extra_bed_capacity;
        return entity;
    }
}
