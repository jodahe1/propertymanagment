import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRoomRepository } from "src/room/application/ports/outgoing/room.repository";
import { Room } from "src/room/domain/entities";
import { RoomPersistenceMapper } from "../mappers/room.mapper";
import { RoomPersistenceEntity } from "../persistence-entities/room.persistence.entity";

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
        if (updates.roomTypeId) entity.roomTypeId = updates.roomTypeId;
        if (updates.roomNumber) entity.roomNumber = updates.roomNumber;
        if (updates.floor) entity.floor = updates.floor;
        if (updates.status) entity.status = updates.status;
        if (updates.lastCleanedAt !== undefined) entity.lastCleanedAt = updates.lastCleanedAt;
        if (updates.notes !== undefined) entity.notes = updates.notes;
    }
}
