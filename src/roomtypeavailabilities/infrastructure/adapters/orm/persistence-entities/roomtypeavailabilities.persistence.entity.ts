import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Roomtypeavailabilities' })
export class RoomtypeavailabilitiesPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  roomTypeId: string;

  @Property()
  date: string;

  @Property()
  availableQuantity: number;

  @Property({ nullable: true })
  priceModifier?: number;

  @Property({ nullable: true })
  minStayNights?: number;

  @Property({ nullable: true })
  maxStayNights?: number;

  @Property({ nullable: true })
  blockedReason?: string;
}
