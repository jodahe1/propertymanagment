import { Room } from 'src/room/domain/entities';
import { RoomPersistenceEntity } from '../persistence-entities/room.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RoomPersistenceMapper {
    static toDomain(entity: RoomPersistenceEntity): Room {
        return new Room(
            entity.hotel_id,
            entity.room_type_id,
            entity.room_number,
            entity.floor_number,
            entity.availability_status,
            entity.current_price,
            entity.notes,
            entity.id,
        );
    }

    static toEntity(domain: Room, em: EntityManager): RoomPersistenceEntity {
        const entity = new RoomPersistenceEntity();
        entity.id = domain.id;
        entity.hotel_id = domain.hotel_id;
        entity.room_type_id = domain.room_type_id;
        entity.room_number = domain.room_number;
        entity.floor_number = domain.floor_number;
        entity.availability_status = domain.availability_status;
        entity.current_price = domain.current_price;
        entity.notes = domain.notes;
        return entity;
    }
}
