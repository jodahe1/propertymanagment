import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRoomRepository } from "src/room/application/ports/outgoing/room.repository";
import { Room } from "src/room/domain/entities";
import { RoomPersistenceMapper } from "../mappers/room.mapper";
import { RoomPersistenceEntity } from "../persistence-entities/room.persistence.entity";
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm/persistence-entities/hotel.persistence.entity';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';

@Injectable()
export class RoomRepository extends MikroOrmBaseRepository<Room> implements TRoomRepository {
    constructor(
        @InjectRepository(RoomPersistenceEntity)
        private readonly repo: EntityRepository<RoomPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: RoomPersistenceEntity): Room {
        return RoomPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Room): RoomPersistenceEntity {
        return RoomPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: RoomPersistenceEntity, updates: Room): void {
        if (updates.hotel_id) entity.hotel = this.entityManager.getReference(HotelPersistenceEntity, updates.hotel_id);
        if (updates.room_type_id) entity.roomType = this.entityManager.getReference(RoomTypePersistenceEntity, updates.room_type_id);
        if (updates.room_number) entity.room_number = updates.room_number;
        if (updates.floor_number !== undefined) entity.floor_number = updates.floor_number;
        if (updates.availability_status) entity.availability_status = updates.availability_status;
        if (updates.current_price !== undefined) entity.current_price = updates.current_price;
        if (updates.notes !== undefined) entity.notes = updates.notes;
    }
}
