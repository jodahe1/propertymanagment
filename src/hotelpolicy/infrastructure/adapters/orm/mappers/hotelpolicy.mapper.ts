import { Hotelpolicy } from 'src/hotelpolicy/domain/entities';
import { HotelpolicyPersistenceEntity } from '../persistence-entities/hotelpolicy.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class HotelpolicyPersistenceMapper {
    static toDomain(entity: HotelpolicyPersistenceEntity): Hotelpolicy {
        return new Hotelpolicy(
            entity.hotelId,
            entity.policyType,
            entity.description,
            entity.effectiveDate,
            entity.id,
        );
    }

    static toEntity(domain: Hotelpolicy, em: EntityManager): HotelpolicyPersistenceEntity {
        const entity = new HotelpolicyPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.policyType = domain.policyType;
        entity.description = domain.description;
        entity.effectiveDate = domain.effectiveDate;
        return entity;
    }
}
