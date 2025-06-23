import { Guest } from 'src/guest/domain/entities';
import { GuestPersistenceEntity } from '../persistence-entities/guest.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class GuestPersistenceMapper {
    static toDomain(entity: GuestPersistenceEntity): Guest {
        return new Guest(
            entity.fullName,
            entity.email,
            entity.phoneNumber,
            entity.address,
            entity.city,
            entity.country,
            entity.zipCode,
            entity.dateOfBirth,
            entity.nationality,
            entity.idDocumentType,
            entity.idDocumentNumber,
            entity.notes,
            entity.id,
        );
    }

    static toEntity(domain: Guest, em: EntityManager): GuestPersistenceEntity {
        const entity = new GuestPersistenceEntity();
        entity.id = domain.id;
        entity.fullName = domain.fullName;
        entity.email = domain.email;
        entity.phoneNumber = domain.phoneNumber;
        entity.address = domain.address;
        entity.city = domain.city;
        entity.country = domain.country;
        entity.zipCode = domain.zipCode;
        entity.dateOfBirth = domain.dateOfBirth;
        entity.nationality = domain.nationality;
        entity.idDocumentType = domain.idDocumentType;
        entity.idDocumentNumber = domain.idDocumentNumber;
        entity.notes = domain.notes;
        return entity;
    }
}
