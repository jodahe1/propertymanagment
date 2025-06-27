import { Guest } from 'src/guest/domain/entities';
import { GuestPersistenceEntity } from '../persistence-entities/guest.persistence.entity';
import { EntityManager } from '@mikro-orm/core';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm/persistence-entities/user.persistence.entity';
import {
  GuestGender,
  GuestIdDocumentType,
} from '../../../../domain/valueObjects/guestEnum';

export class GuestPersistenceMapper {
  static toDomain(entity: GuestPersistenceEntity): Guest {
    const registeredByUserId =
      entity.registered_by_user?.id || entity.registered_by_user_id;

    return new Guest(
      entity.first_name,
      entity.last_name,
      entity.email,
      entity.phone,
      entity.address,
      entity.country,
      entity.country_num,
      entity.city,
      entity.postcode,
      entity.gender as GuestGender,
      entity.id_document_type as GuestIdDocumentType,
      entity.id_number,
      entity.id_issue_date,
      entity.id_expiry_date,
      entity.nationality,
      entity.date_of_birth,
      entity.marketing_opt_in,
      registeredByUserId,
      entity.is_organization,
      entity.address2,
      entity.state,
      entity.organization_name,
      entity.id,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
      entity.createdBy,
      entity.updatedBy,
    );
  }

  static toEntity(domain: Guest, em: EntityManager): GuestPersistenceEntity {
    const entity = new GuestPersistenceEntity();
    entity.id = domain.id;
    entity.first_name = domain.first_name;
    entity.last_name = domain.last_name;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.address = domain.address;
    entity.country = domain.country;
    entity.country_num = domain.country_num;
    entity.city = domain.city;
    entity.postcode = domain.postcode;
    entity.gender = domain.gender;
    entity.id_document_type = domain.id_document_type;
    entity.id_number = domain.id_number;
    entity.id_issue_date = domain.id_issue_date;
    entity.id_expiry_date = domain.id_expiry_date;
    entity.nationality = domain.nationality;
    entity.date_of_birth = domain.date_of_birth;
    entity.marketing_opt_in = domain.marketing_opt_in;

    if (domain.registered_by_user_id) {
      entity.registered_by_user = em.getReference(
        UserPersistenceEntity,
        domain.registered_by_user_id,
      );
    } else {
      entity.registered_by_user = undefined;
    }

    entity.address2 = domain.address2;
    entity.state = domain.state;
    entity.is_organization = domain.is_organization;
    entity.organization_name = domain.organization_name;

    entity.isActive = domain.isActive;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.createdBy = domain.createdBy;
    entity.updatedBy = domain.updatedBy;

    return entity;
  }
}
