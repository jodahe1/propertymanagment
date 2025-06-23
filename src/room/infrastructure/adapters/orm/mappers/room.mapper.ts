import { Room } from 'src/room/domain/entities';
import { RoomPersistenceEntity } from '../persistence-entities/room.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class RoomPersistenceMapper {
    static toDomain(entity: RoomPersistenceEntity): Room {
        return new Room(
            entity.roomTypeId,
            entity.roomNumber,
            entity.floor,
            entity.status,
            entity.lastCleanedAt,
            entity.notes,
            entity.id,
        );
    }

    static toEntity(domain: Room, em: EntityManager): RoomPersistenceEntity {
        const entity = new RoomPersistenceEntity();
        entity.id = domain.id;
        entity.roomTypeId = domain.roomTypeId;
        entity.roomNumber = domain.roomNumber;
        entity.floor = domain.floor;
        entity.status = domain.status;
        entity.lastCleanedAt = domain.lastCleanedAt;
        entity.notes = domain.notes;
        return entity;
    }
}
