import { Hotel } from 'src/hotel/domain/entities';
import { HotelPersistenceEntity } from '../persistence-entities/hotel.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class HotelPersistenceMapper {
    static toDomain(entity: HotelPersistenceEntity): Hotel {
        return new Hotel(
            entity.user_id,
            entity.name,
            entity.description,
            entity.address,
            entity.city,
            entity.country,
            entity.zip_code,
            entity.latitude,
            entity.longitude,
            entity.contact_email,
            entity.contact_phone,
            entity.star_rating,
            entity.status,
            entity.timezone,
            entity.images,
            entity.amenities,
            entity.check_in_instructions,
            entity.legal_information,
            entity.id,
        );
    }

    static toEntity(domain: Hotel, em: EntityManager): HotelPersistenceEntity {
        const entity = new HotelPersistenceEntity();
        entity.id = domain.id;
        entity.user_id = domain.user_id;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.address = domain.address;
        entity.city = domain.city;
        entity.country = domain.country;
        entity.zip_code = domain.zip_code;
        entity.latitude = domain.latitude;
        entity.longitude = domain.longitude;
        entity.contact_email = domain.contact_email;
        entity.contact_phone = domain.contact_phone;
        entity.star_rating = domain.star_rating;
        entity.status = domain.status;
        entity.timezone = domain.timezone;
        entity.images = domain.images;
        entity.amenities = domain.amenities;
        entity.check_in_instructions = domain.check_in_instructions;
        entity.legal_information = domain.legal_information;
        return entity;
    }
}
