import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Housekeeping' })
export class HousekeepingPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  roomId: string;

  @Property()
  staffId: string;

  @Property()
  status: string;

  @Property({ nullable: true })
  notes?: string;

  @Property({ nullable: true })
  completedAt?: Date;
}
