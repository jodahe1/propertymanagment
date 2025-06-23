import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Rateplan' })
export class RateplanPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  roomTypeId: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  basePriceModifier: number;

  @Property({ nullable: true })
  minNights?: number;

  @Property({ nullable: true })
  maxNights?: number;

  @Property({ nullable: true })
  validFrom?: Date;

  @Property({ nullable: true })
  validTo?: Date;

  @Property()
  status: string;
}
