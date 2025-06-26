import { Roomtypeavailabilities } from 'src/roomtypeavailabilities/domain/entities';
import { RoomtypeavailabilitiesPersistenceEntity } from '../persistence-entities/roomtypeavailabilities.persistence.entity';
import { EntityManager, ref, Ref } from '@mikro-orm/core';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';

export class RoomtypeavailabilitiesPersistenceMapper {
  static toDomain(
    entity: RoomtypeavailabilitiesPersistenceEntity,
  ): Roomtypeavailabilities {
    return new Roomtypeavailabilities(
      entity.roomType.id, // Access roomTypeId through the roomType relation
      entity.date,
      entity.availableQuantity,
      entity.priceModifier,
      entity.minStayNights,
      entity.maxStayNights,
      entity.blockedReason,
      entity.id,
      entity.isActive, // Assuming isActive is part of domain entity constructor
      entity.createdAt,
      entity.updatedAt,
      entity.createdBy,
      entity.updatedBy,
    );
  }

  static toEntity(
    domain: Roomtypeavailabilities,
    em: EntityManager,
  ): RoomtypeavailabilitiesPersistenceEntity {
    const entity = em.create(RoomtypeavailabilitiesPersistenceEntity, {
      id: domain.id,
      roomType: ref(domain.roomTypeId) as Ref<RoomTypePersistenceEntity>, // Set roomType using ref
      date: domain.date,
      availableQuantity: domain.availableQuantity,
      priceModifier: domain.priceModifier,
      minStayNights: domain.minStayNights,
      maxStayNights: domain.maxStayNights,
      blockedReason: domain.blockedReason,
      isActive: domain.isActive, // Assuming isActive property exists
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      createdBy: domain.createdBy,
      updatedBy: domain.updatedBy,
    });
    return entity;
  }
}
