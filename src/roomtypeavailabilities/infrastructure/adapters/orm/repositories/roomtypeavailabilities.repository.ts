import { EntityManager, EntityRepository, ref, Ref } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TRoomtypeavailabilitiesRepository } from "src/roomtypeavailabilities/application/ports/outgoing/roomtypeavailabilities.repository";
import { Roomtypeavailabilities } from "src/roomtypeavailabilities/domain/entities";
import { RoomtypeavailabilitiesPersistenceMapper } from "../mappers/roomtypeavailabilities.mapper";
import { RoomtypeavailabilitiesPersistenceEntity } from "../persistence-entities/roomtypeavailabilities.persistence.entity";
import { RoomTypePersistenceEntity } from "src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity";

@Injectable()
export class RoomtypeavailabilitiesRepository extends MikroOrmBaseRepository<Roomtypeavailabilities> implements TRoomtypeavailabilitiesRepository {
    constructor(
        @InjectRepository(RoomtypeavailabilitiesPersistenceEntity)
        private readonly repo: EntityRepository<RoomtypeavailabilitiesPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: RoomtypeavailabilitiesPersistenceEntity): Roomtypeavailabilities {
        return RoomtypeavailabilitiesPersistenceMapper.toDomain(entity);
    }

    protected toEntity(domain: Roomtypeavailabilities): RoomtypeavailabilitiesPersistenceEntity {
        return RoomtypeavailabilitiesPersistenceMapper.toEntity(domain, this.entityManager);
    }

    protected updateEntity(entity: RoomtypeavailabilitiesPersistenceEntity, updates: Roomtypeavailabilities): void {
        // Update roomType relation using ref when roomTypeId is provided in updates
        if (updates.roomTypeId) {
            entity.roomType = ref(updates.roomTypeId) as Ref<RoomTypePersistenceEntity>;
        }
        
        if (updates.date) entity.date = updates.date;
        if (updates.availableQuantity) entity.availableQuantity = updates.availableQuantity;
        if (updates.priceModifier !== undefined) entity.priceModifier = updates.priceModifier;
        if (updates.minStayNights !== undefined) entity.minStayNights = updates.minStayNights;
        if (updates.maxStayNights !== undefined) entity.maxStayNights = updates.maxStayNights;
        if (updates.blockedReason !== undefined) entity.blockedReason = updates.blockedReason;
        if (updates.isActive !== undefined) entity.isActive = updates.isActive;
        if (updates.updatedBy !== undefined) entity.updatedBy = updates.updatedBy;
        
    }
}