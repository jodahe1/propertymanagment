import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { BlockedReason } from 'src/roomtypeavailabilities/domain/valueObjects/blocked-reason.enum';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';

@Entity({ tableName: 'room_type_availabilities' })
export class RoomtypeavailabilitiesPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => RoomTypePersistenceEntity, {
    fieldName: 'roomTypeId',
    referenceColumnName: 'id',
    nullable: false,
  })
  roomType!: Ref<RoomTypePersistenceEntity>;

  @Property({ type: 'date' })
  date!: string;

  @Property()
  availableQuantity!: number;

  @Property({ nullable: true })
  priceModifier?: number;

  @Property({ nullable: true })
  minStayNights?: number;

  @Property({ nullable: true })
  maxStayNights?: number;

  @Property({ type: 'string' })
  blockedReason?: BlockedReason;
}
