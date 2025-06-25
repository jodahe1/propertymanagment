import { Room } from 'src/room/domain/entities';
import { RoomPersistenceEntity } from '../persistence-entities/room.persistence.entity';
import { EntityManager } from '@mikro-orm/core';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm/persistence-entities/hotel.persistence.entity';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';

export class RoomPersistenceMapper {
    static toDomain(entity: RoomPersistenceEntity): Room {
        return new Room(
            entity.hotel?.id ?? '',
            null, // hotel object placeholder
            entity.roomType?.id ?? '',
            null, // roomType object placeholder
            entity.room_number,
            entity.availability_status,
            entity.current_price,
            entity.floor_number,
            entity.notes,
            entity.id,
            true, // isActive default
        );
    }

    static toEntity(domain: Room, em: EntityManager): RoomPersistenceEntity {
        const entity = new RoomPersistenceEntity();
        entity.id = domain.id;
        entity.hotel = em.getReference(HotelPersistenceEntity, domain.hotel_id);
        entity.roomType = em.getReference(RoomTypePersistenceEntity, domain.room_type_id);
        entity.room_number = domain.room_number;
        entity.floor_number = domain.floor_number;
        entity.availability_status = domain.availability_status;
        entity.current_price = domain.current_price;
        entity.notes = domain.notes;
        return entity;
    }
}
