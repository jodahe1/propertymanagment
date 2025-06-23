import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { THotelRepository } from "src/hotel/application/ports/outgoing/hotel.repository";
import { Hotel } from "src/hotel/domain/entities";
import { HotelPersistenceMapper } from "../mappers/hotel.mapper";
import { HotelPersistenceEntity } from "../persistence-entities/hotel.persistence.entity";

@Injectable()
export class HotelRepository extends MikroOrmBaseRepository<Hotel> implements THotelRepository {
    constructor(
        @InjectRepository(HotelPersistenceEntity)
        private readonly repo: EntityRepository<HotelPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: HotelPersistenceEntity): Hotel {
        return HotelPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Hotel): HotelPersistenceEntity {
        return HotelPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: HotelPersistenceEntity, updates: Hotel): void {
        if (updates.userId) entity.userId = updates.userId;
        if (updates.name) entity.name = updates.name;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.address) entity.address = updates.address;
        if (updates.city) entity.city = updates.city;
        if (updates.country) entity.country = updates.country;
        if (updates.zipCode !== undefined) entity.zipCode = updates.zipCode;
        if (updates.latitude !== undefined) entity.latitude = updates.latitude;
        if (updates.longitude !== undefined) entity.longitude = updates.longitude;
        if (updates.contactEmail) entity.contactEmail = updates.contactEmail;
        if (updates.contactPhone) entity.contactPhone = updates.contactPhone;
        if (updates.starRating !== undefined) entity.starRating = updates.starRating;
        if (updates.status) entity.status = updates.status;
        if (updates.timezone !== undefined) entity.timezone = updates.timezone;
        if (updates.images !== undefined) entity.images = updates.images;
    }
}
