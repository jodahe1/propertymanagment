import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRoomTypeRepository } from "src/roomType/application/ports/outgoing/roomType.repository";
import { RoomType } from "src/roomType/domain/entities";
import { RoomTypePersistenceMapper } from "../mappers/roomType.mapper";
import { RoomTypePersistenceEntity } from "../persistence-entities/roomType.persistence.entity";

@Injectable()
export class RoomTypeRepository extends MikroOrmBaseRepository<RoomType> implements TRoomTypeRepository {
    constructor(
        @InjectRepository(RoomTypePersistenceEntity)
        private readonly repo: EntityRepository<RoomTypePersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: RoomTypePersistenceEntity): RoomType {
        return RoomTypePersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: RoomType): RoomTypePersistenceEntity {
        return RoomTypePersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: RoomTypePersistenceEntity, updates: RoomType): void {
        if (updates.hotel_id) entity.hotel_id = updates.hotel_id;
        if (updates.name) entity.name = updates.name;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.max_guests) entity.max_guests = updates.max_guests;
        if (updates.max_adults) entity.max_adults = updates.max_adults;
        if (updates.max_children) entity.max_children = updates.max_children;
        if (updates.bed_type) entity.bed_type = updates.bed_type;
        if (updates.amenities !== undefined) entity.amenities = updates.amenities;
        if (updates.base_price) entity.base_price = updates.base_price;
        if (updates.size_sqm !== undefined) entity.size_sqm = updates.size_sqm;
        if (updates.quantity) entity.quantity = updates.quantity;
        if (updates.extra_bed_capacity !== undefined) entity.extra_bed_capacity = updates.extra_bed_capacity;
    }
}
