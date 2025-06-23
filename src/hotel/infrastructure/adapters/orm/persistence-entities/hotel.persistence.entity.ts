import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Hotel' })
export class HotelPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  userId: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  address: string;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property({ nullable: true })
  zipCode?: string;

  @Property({ nullable: true })
  latitude?: number;

  @Property({ nullable: true })
  longitude?: number;

  @Property()
  contactEmail: string;

  @Property()
  contactPhone: string;

  @Property({ nullable: true })
  starRating?: number;

  @Property()
  status: string;

  @Property({ nullable: true })
  timezone?: string;

  @Property({ type: 'json', nullable: true })
  images?: string[];
}
