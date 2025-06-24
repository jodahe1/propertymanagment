import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Serviceproduct' })
export class ServiceproductPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  price: number;

  @Property()
  currency: string;

  @Property()
  status: string;
}
