import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TServiceproductRepository } from "src/serviceproduct/application/ports/outgoing/serviceproduct.repository";
import { Serviceproduct } from "src/serviceproduct/domain/entities";
import { ServiceproductPersistenceMapper } from "../mappers/serviceproduct.mapper";
import { ServiceproductPersistenceEntity } from "../persistence-entities/serviceproduct.persistence.entity";

@Injectable()
export class ServiceproductRepository extends MikroOrmBaseRepository<Serviceproduct> implements TServiceproductRepository {
    constructor(
        @InjectRepository(ServiceproductPersistenceEntity)
        private readonly repo: EntityRepository<ServiceproductPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: ServiceproductPersistenceEntity): Serviceproduct {
        return ServiceproductPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Serviceproduct): ServiceproductPersistenceEntity {
        return ServiceproductPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: ServiceproductPersistenceEntity, updates: Serviceproduct): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.name) entity.name = updates.name;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.price) entity.price = updates.price;
        if (updates.currency) entity.currency = updates.currency;
        if (updates.status) entity.status = updates.status;
    }
}
