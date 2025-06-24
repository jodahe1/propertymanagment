import { Serviceproduct } from 'src/serviceproduct/domain/entities';
import { ServiceproductPersistenceEntity } from '../persistence-entities/serviceproduct.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class ServiceproductPersistenceMapper {
    static toDomain(entity: ServiceproductPersistenceEntity): Serviceproduct {
        return new Serviceproduct(
            entity.hotelId,
            entity.name,
            entity.description,
            entity.price,
            entity.currency,
            entity.status,
            entity.id,
        );
    }

    static toEntity(domain: Serviceproduct, em: EntityManager): ServiceproductPersistenceEntity {
        const entity = new ServiceproductPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.price = domain.price;
        entity.currency = domain.currency;
        entity.status = domain.status;
        return entity;
    }
}
