import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRoomtypeRepository } from "src/roomtype/application/ports/outgoing/roomtype.repository";
import { Roomtype } from "src/roomtype/domain/entities";
import { RoomtypePersistenceMapper } from "../mappers/roomtype.mapper";
import { RoomtypePersistenceEntity } from "../persistence-entities/roomtype.persistence.entity";

@Injectable()
export class RoomtypeRepository extends MikroOrmBaseRepository<Roomtype> implements TRoomtypeRepository {
    constructor(
        @InjectRepository(RoomtypePersistenceEntity)
        private readonly repo: EntityRepository<RoomtypePersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: RoomtypePersistenceEntity): Roomtype {
        return RoomtypePersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Roomtype): RoomtypePersistenceEntity {
        return RoomtypePersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: RoomtypePersistenceEntity, updates: Roomtype): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.name) entity.name = updates.name;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.maxGuests) entity.maxGuests = updates.maxGuests;
        if (updates.bedType) entity.bedType = updates.bedType;
        if (updates.amenities !== undefined) entity.amenities = updates.amenities;
        if (updates.basePrice) entity.basePrice = updates.basePrice;
        if (updates.sizeSqft !== undefined) entity.sizeSqft = updates.sizeSqft;
        if (updates.images !== undefined) entity.images = updates.images;
    }
}
