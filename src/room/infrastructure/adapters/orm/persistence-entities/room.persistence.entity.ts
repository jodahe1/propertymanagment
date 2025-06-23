import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Room' })
export class RoomPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  roomTypeId: string;

  @Property()
  roomNumber: string;

  @Property()
  floor: number;

  @Property()
  status: string;

  @Property({ nullable: true })
  lastCleanedAt?: Date;

  @Property({ nullable: true })
  notes?: string;
}
