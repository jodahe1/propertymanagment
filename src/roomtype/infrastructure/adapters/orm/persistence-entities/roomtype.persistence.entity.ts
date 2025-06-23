import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Roomtype' })
export class RoomtypePersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  maxGuests: number;

  @Property()
  bedType: string;

  @Property({ type: 'json', nullable: true })
  amenities?: string[];

  @Property()
  basePrice: number;

  @Property({ nullable: true })
  sizeSqft?: number;

  @Property({ type: 'json', nullable: true })
  images?: string[];
}
