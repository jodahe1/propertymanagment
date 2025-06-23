import { Hotel } from 'src/hotel/domain/entities';
import { HotelPersistenceEntity } from '../persistence-entities/hotel.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class HotelPersistenceMapper {
    static toDomain(entity: HotelPersistenceEntity): Hotel {
        return new Hotel(
            entity.userId,
            entity.name,
            entity.description,
            entity.address,
            entity.city,
            entity.country,
            entity.zipCode,
            entity.latitude,
            entity.longitude,
            entity.contactEmail,
            entity.contactPhone,
            entity.starRating,
            entity.status,
            entity.timezone,
            entity.images,
            entity.id,
        );
    }

    static toEntity(domain: Hotel, em: EntityManager): HotelPersistenceEntity {
        const entity = new HotelPersistenceEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.address = domain.address;
        entity.city = domain.city;
        entity.country = domain.country;
        entity.zipCode = domain.zipCode;
        entity.latitude = domain.latitude;
        entity.longitude = domain.longitude;
        entity.contactEmail = domain.contactEmail;
        entity.contactPhone = domain.contactPhone;
        entity.starRating = domain.starRating;
        entity.status = domain.status;
        entity.timezone = domain.timezone;
        entity.images = domain.images;
        return entity;
    }
}
