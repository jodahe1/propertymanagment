import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Promotion' })
export class PromotionPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  code: string;

  @Property()
  discountType: string;

  @Property()
  value: number;

  @Property()
  validFrom: Date;

  @Property()
  validTo: Date;

  @Property({ nullable: true })
  minStay?: number;
}
