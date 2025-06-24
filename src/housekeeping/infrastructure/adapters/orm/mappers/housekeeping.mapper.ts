import { Housekeeping } from 'src/housekeeping/domain/entities';
import { HousekeepingPersistenceEntity } from '../persistence-entities/housekeeping.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class HousekeepingPersistenceMapper {
    static toDomain(entity: HousekeepingPersistenceEntity): Housekeeping {
        return new Housekeeping(
            entity.roomId,
            entity.staffId,
            entity.status,
            entity.notes,
            entity.completedAt,
            entity.id,
        );
    }

    static toEntity(domain: Housekeeping, em: EntityManager): HousekeepingPersistenceEntity {
        const entity = new HousekeepingPersistenceEntity();
        entity.id = domain.id;
        entity.roomId = domain.roomId;
        entity.staffId = domain.staffId;
        entity.status = domain.status;
        entity.notes = domain.notes;
        entity.completedAt = domain.completedAt;
        return entity;
    }
}
