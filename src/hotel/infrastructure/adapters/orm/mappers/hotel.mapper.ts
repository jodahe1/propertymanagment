import { Hotel } from 'src/hotel/domain/entities';
import { HotelPersistenceEntity } from '../persistence-entities/hotel.persistence.entity';
import { EntityManager } from '@mikro-orm/core';
import { HotelStatus } from 'src/hotel/domain/valueObjects';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm/persistence-entities/user.persistence.entity';
import { UserPersistenceMapper } from 'src/user/infrastructure/adapters/orm/mappers/user.mapper';

export class HotelPersistenceMapper {
  static toDomain(entity: HotelPersistenceEntity): Hotel {
    const userDomain = entity.user ? UserPersistenceMapper.toDomain(entity.user) : null;
    return new Hotel(
      entity.user?.id ?? '', // user_id (for domain model, if needed)
      userDomain, // User domain object
      entity.name,
      entity.address,
      entity.city,
      entity.country,
      entity.status as HotelStatus,
      entity.description,
      entity.zip_code,
      entity.latitude,
      entity.longitude,
      entity.contact_email,
      entity.contact_phone,
      entity.star_rating,
      entity.timezone,
      entity.images,
      entity.amenities,
      entity.check_in_instructions,
      entity.legal_information,
      entity.isActive,
      entity.id,
    );
  }

  static toEntity(domain: Hotel, em: EntityManager): HotelPersistenceEntity {
    const entity = new HotelPersistenceEntity();

    entity.id = domain.id;

  
    entity.user = em.getReference(UserPersistenceEntity, domain.user_id);

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
    entity.isActive = domain.isActive;

    return entity;
  }
}
